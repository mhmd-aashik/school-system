import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { students } from './schemas/student.schema';
import { eq } from 'drizzle-orm';
import {
  DRIZZLE_DATABASE,
  type DrizzleDatabase,
} from '@school-system/database';
import { UpdateStudentDto } from './dto/update-student.dto';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable()
export class StudentService {
  constructor(
    @Inject(DRIZZLE_DATABASE)
    private readonly database: DrizzleDatabase,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.database.select().from(students).orderBy(students.id);
  }

  async findOne(id: number): Promise<Student> {
    const result = await this.database
      .select()
      .from(students)
      .where(eq(students.id, id))
      .limit(1);

    const student = result[0];

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }

    return student;
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const normalizedEmail = createStudentDto.email.trim().toLowerCase();

    const existingStudent = await this.database
      .select({ id: students.id })
      .from(students)
      .where(eq(students.email, normalizedEmail))
      .limit(1);

    if (existingStudent.length > 0) {
      throw new ConflictException('A student with this email already exists');
    }

    const insertedStudents = await this.database
      .insert(students)
      .values({
        firstName: createStudentDto.firstName.trim(),
        lastName: createStudentDto.lastName.trim(),
        email: normalizedEmail,
      })
      .returning();

    const student = insertedStudents[0];

    if (!student) {
      throw new Error('Student could not be created');
    }

    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    await this.findOne(id);

    const updateData: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      updatedAt: Date;
    }> = {
      updatedAt: new Date(),
    };

    if (updateStudentDto.firstName !== undefined) {
      updateData.firstName = updateStudentDto.firstName.trim();
    }

    if (updateStudentDto.lastName !== undefined) {
      updateData.lastName = updateStudentDto.lastName.trim();
    }

    if (updateStudentDto.email !== undefined) {
      const normalizedEmail = updateStudentDto.email.trim().toLowerCase();

      const existingStudent = await this.database
        .select({ id: students.id })
        .from(students)
        .where(eq(students.email, normalizedEmail))
        .limit(1);

      const emailOwner = existingStudent[0];

      if (emailOwner && emailOwner.id !== id) {
        throw new ConflictException('A student with this email already exists');
      }

      updateData.email = normalizedEmail;
    }

    const updatedStudents = await this.database
      .update(students)
      .set(updateData)
      .where(eq(students.id, id))
      .returning();

    const student = updatedStudents[0];

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }

    return student;
  }

  async remove(id: number): Promise<void> {
    const deletedStudents = await this.database
      .delete(students)
      .where(eq(students.id, id))
      .returning({ id: students.id });

    const deletedStudent = deletedStudents[0];

    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Student } from '../entities/student.schema';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentRepository } from '../repositories/student.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }

    return student;
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const normalizedEmail = createStudentDto.email.trim().toLowerCase();

    const existingStudent =
      await this.studentRepository.findByEmail(normalizedEmail);

    if (existingStudent) {
      throw new ConflictException('A student with this email already exists');
    }

    const student = await this.studentRepository.create({
      firstName: createStudentDto.firstName.trim(),
      lastName: createStudentDto.lastName.trim(),
      email: normalizedEmail,
    });

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

    const updateData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      updatedAt: Date;
    } = {
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

      const existingStudent =
        await this.studentRepository.findByEmail(normalizedEmail);

      if (existingStudent && existingStudent.id !== id) {
        throw new ConflictException('A student with this email already exists');
      }

      updateData.email = normalizedEmail;
    }

    const student = await this.studentRepository.update(id, updateData);

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }

    return student;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.studentRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }
  }
}

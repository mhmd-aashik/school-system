import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable()
export class StudentService {
  private students: Student[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Smith',
      email: 'sarah@example.com',
    },
  ];

  findAll(): Student[] {
    return this.students;
  }

  findOne(id: number): Student {
    const student = this.students.find((item) => item.id === id);

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }
    return student;
  }

  create(createStudentDto: CreateStudentDto): Student {
    const existingStudent = this.students.find(
      (student) =>
        student.email.toLowerCase() === createStudentDto.email.toLowerCase(),
    );

    if (existingStudent) {
      throw new ConflictException('A student with this email already exists');
    }

    const student: Student = {
      id: this.generateId(),
      ...createStudentDto,
    };

    this.students.push(student);
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto): Student {
    const student = this.findOne(id);

    if (updateStudentDto.email) {
      this.checkEmailAvailability(updateStudentDto.email, id);
    }

    Object.assign(student, updateStudentDto);

    return student;
  }

  remove(id: number): void {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );

    if (studentIndex === -1) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }

    this.students.splice(studentIndex, 1);
  }

  private checkEmailAvailability(email: string, ignoredId?: number): void {
    const existingStudent = this.students.find(
      (student) =>
        student.email.toLowerCase() === email.toLowerCase() &&
        student.id !== ignoredId,
    );

    if (existingStudent) {
      throw new ConflictException('A student with this email already exists');
    }
  }

  private generateId(): number {
    if (this.students.length === 0) {
      return 1;
    }

    return Math.max(...this.students.map((student) => student.id)) + 1;
  }
}

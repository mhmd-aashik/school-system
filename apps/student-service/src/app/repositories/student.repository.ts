import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import {
  DRIZZLE_DATABASE,
  type DrizzleDatabase,
} from '@school-system/database';
import { Student, students, NewStudent } from '../entities/student.schema';

@Injectable()
export class StudentRepository {
  constructor(
    @Inject(DRIZZLE_DATABASE)
    private readonly database: DrizzleDatabase,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.database.select().from(students).orderBy(students.id);
  }

  async findById(id: number): Promise<Student | undefined> {
    const result = await this.database
      .select()
      .from(students)
      .where(eq(students.id, id))
      .limit(1);

    return result[0];
  }

  async findByEmail(email: string): Promise<Student | undefined> {
    const result = await this.database
      .select()
      .from(students)
      .where(eq(students.email, email))
      .limit(1);

    return result[0];
  }

  async create(data: NewStudent): Promise<Student | undefined> {
    const result = await this.database
      .insert(students)
      .values(data)
      .returning();

    return result[0];
  }

  async update(
    id: number,
    data: Partial<NewStudent>,
  ): Promise<Student | undefined> {
    const result = await this.database
      .update(students)
      .set(data)
      .where(eq(students.id, id))
      .returning();

    return result[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.database
      .delete(students)
      .where(eq(students.id, id))
      .returning({ id: students.id });

    return result.length > 0;
  }
}

import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('first_name', {
    length: 50,
  }).notNull(),
  lastName: varchar('last_name', {
    length: 50,
  }).notNull(),
  email: varchar('email', {
    length: 255,
  })
    .notNull()
    .unique(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;

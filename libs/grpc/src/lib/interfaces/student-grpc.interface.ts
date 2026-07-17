import { Observable } from 'rxjs';

export interface Empty {
  [key: string]: unknown;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface StudentList {
  students: Student[];
}

export interface StudentGrpcService {
  getStudents(data: Empty): Observable<StudentList>;
}

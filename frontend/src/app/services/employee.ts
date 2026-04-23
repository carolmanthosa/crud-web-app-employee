import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  employeeId?: string;
  idNumber?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  status?: string; // ← added back
  profilePicture?: string;
  hireDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/employees'
    : 'http://13.60.40.154:3000/employees';

  constructor(private http: HttpClient) {}

  getAll(search?: string, department?: string): Observable<Employee[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (department) params = params.set('department', department);
    return this.http.get<Employee[]>(this.apiUrl, { params });
  }

  getOne(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
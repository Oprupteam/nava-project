import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from './department';
import { Employee } from '../employee/employee';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  [x: string]: any;

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addDepartment(department: Department): Observable<Department[]>{
    return this.http.post<Department[]>(`${this.apiServerUrl}/department/add`,department)
  }

  public getAllDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(`${this.apiServerUrl}/department/all`)
  }
  

  public getDepartmentById(departmentId: any): Observable<Department[]>{
    return this.http.get<Department[]>(`${this.apiServerUrl}/department/find/${departmentId}`)
  }

  public deleteDepartment(departmentId: Department): Observable<Department>{
    return this.http.put<Department>(`${this.apiServerUrl}/department/delete/${departmentId}`,departmentId);

  }

  public updateDepartment(department: Department): Observable<Department[]>{
    return this.http.put<Department[]>(`${this.apiServerUrl}/department/update`, department)
  }

  public getAllDepManagers(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/allDepManagers`)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeType } from './employee-type';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addEmployeeType(employeeType: EmployeeType): Observable<EmployeeType[]>{
    return this.http.post<EmployeeType[]>(`${this.apiServerUrl}/employeeType/add`,employeeType)
  }

  public getAllEmployeeTypes(): Observable<EmployeeType[]>{
    return this.http.get<EmployeeType[]>(`${this.apiServerUrl}/employeeType/all`)
  }

  public getEmployeeTypeById(employeeTypeId: any): Observable<EmployeeType[]>{
    return this.http.get<EmployeeType[]>(`${this.apiServerUrl}/employeeType/find/${employeeTypeId}`)
  }

  public deleteEmployeeType(employeeTypeId: EmployeeType): Observable<EmployeeType>{
    return this.http.put<EmployeeType>(`${this.apiServerUrl}/employeeType/delete/${employeeTypeId}`,employeeTypeId);

  }

  public updateEmployeeType(employeeType: EmployeeType): Observable<EmployeeType[]>{
    return this.http.put<EmployeeType[]>(`${this.apiServerUrl}/employeeType/update`, employeeType)
  }
}

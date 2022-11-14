import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Section } from './section';
import { Employee } from '../employee/employee';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addSection(section: Section): Observable<Section[]>{
    return this.http.post<Section[]>(`${this.apiServerUrl}/section/add`,section)
  }

  public getAllSections(): Observable<Section[]>{
    return this.http.get<Section[]>(`${this.apiServerUrl}/section/all`)
  }
  
  public getSectionById(sectionId: any): Observable<Section[]>{
    return this.http.get<Section[]>(`${this.apiServerUrl}/section/findSection/${sectionId}`)
  }

  public getSectionByEmpId(employeeId: any): Observable<Section[]>{
    return this.http.get<Section[]>(`${this.apiServerUrl}/section/findByEmpId/${employeeId}`)
  }
  public deleteSection(sectionId: Section): Observable<Section>{
    return this.http.put<Section>(`${this.apiServerUrl}/section/delete/${sectionId}`,sectionId);

  }

  public updateSection(section: Section): Observable<Section[]>{
    return this.http.put<Section[]>(`${this.apiServerUrl}/section/update`, section)
  }

  public getAllSecManagers(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/allSecManagers`)
  }

}

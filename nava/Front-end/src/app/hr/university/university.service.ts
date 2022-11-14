import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { University } from './university';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addUniversity(university: University): Observable<University[]>{
    return this.http.post<University[]>(`${this.apiServerUrl}/university/add`,university)
  }

  public getAllUniversities(): Observable<University[]>{
    return this.http.get<University[]>(`${this.apiServerUrl}/university/all`)
  }

  public getUniversityById(universityId: any): Observable<University[]>{
    return this.http.get<University[]>(`${this.apiServerUrl}/university/find/${universityId}`)
  }

  public deleteUniversity(universityId: University): Observable<University>{
    return this.http.put<University>(`${this.apiServerUrl}/university/delete/${universityId}`,universityId);

  }

  public updateUniversity(university: University): Observable<University[]>{
    return this.http.put<University[]>(`${this.apiServerUrl}/university/update`, university)
  }
}

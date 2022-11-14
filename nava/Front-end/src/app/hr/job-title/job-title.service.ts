import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobTitle } from './job-title';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {
  [x: string]: any;

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addJobTitle(jobTitle: JobTitle): Observable<JobTitle[]>{
    return this.http.post<JobTitle[]>(`${this.apiServerUrl}/jobTitle/add`,jobTitle)
  }

  public getAllJobTitles(): Observable<JobTitle[]>{
    return this.http.get<JobTitle[]>(`${this.apiServerUrl}/jobTitle/all`)
  }
  

  public getJobTitleById(jobTitleId: any): Observable<JobTitle[]>{
    return this.http.get<JobTitle[]>(`${this.apiServerUrl}/jobTitle/find/${jobTitleId}`)
  }

  public deleteJobTitle(jobTitleId: JobTitle): Observable<JobTitle>{
    return this.http.put<JobTitle>(`${this.apiServerUrl}/jobTitle/delete/${jobTitleId}`,jobTitleId);

  }

  public updateJobTitle(jobTitle: JobTitle): Observable<JobTitle[]>{
    return this.http.put<JobTitle[]>(`${this.apiServerUrl}/jobTitle/update`, jobTitle)
  }
}

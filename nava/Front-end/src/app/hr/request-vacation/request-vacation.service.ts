import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestVacation } from './request-vacation';

@Injectable({
  providedIn: 'root'
})
export class RequestVacationService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.apiServerUrl}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public addRequestVacation(requestVacation:RequestVacation):Observable<RequestVacation[]>{
    return this.http.post<RequestVacation[]>(`${this.apiServerUrl}/requestVacation/add`,requestVacation )
  }
  public getAllRequestVacations(): Observable<RequestVacation[]>{
    return this.http.get<RequestVacation[]>(`${this.apiServerUrl}/requestVacation/all`)
  }
  public getRequestVacationById(requestVacationId: any): Observable<RequestVacation[]>{
    return this.http.get<RequestVacation[]>(`${this.apiServerUrl}/requestVacation/find/${requestVacationId}`)
  }
  public updateEmployee(requestVacationId: RequestVacation): Observable<RequestVacation[]>{
    return this.http.put<RequestVacation[]>(`${this.apiServerUrl}/requestVacation/update`, requestVacationId)
  }

  public getallApprovedrequests():Observable<RequestVacation[]>{
    return this.http.get<RequestVacation[]>(`${this.apiServerUrl}/requestVacation/ALLApprove`)
  }
  public getallRejectedrequests():Observable<RequestVacation[]>{
    return this.http.get<RequestVacation[]>(`${this.apiServerUrl}/requestVacation/ALLRejected`)
  }

  public Approvalrequest(requestVacation:RequestVacation):Observable<RequestVacation[]>{
    return this.http.put<RequestVacation[]>(`${this.apiServerUrl}/requestVacation/approve`, requestVacation)
  }

  public requestRejected(requestVacation:RequestVacation):Observable<RequestVacation[]>{
    return this.http.put<RequestVacation[]>(`${this.apiServerUrl}/requestVacation/reject`, requestVacation)
  }

  
}

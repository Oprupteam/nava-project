import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Management } from './management';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addManagement(management: Management): Observable<Management[]>{
    return this.http.post<Management[]>(`${this.apiServerUrl}/management/add`,management)
  }

  public getAllManagements(): Observable<Management[]>{
    return this.http.get<Management[]>(`${this.apiServerUrl}/management/all`)
  }

  public getManagementById(managementId: any): Observable<Management[]>{
    return this.http.get<Management[]>(`${this.apiServerUrl}/management/find/${managementId}`)
  }

  public deleteManagement(managementId: Management): Observable<Management>{
    return this.http.put<Management>(`${this.apiServerUrl}/management/delete/${managementId}`,managementId);

  }

  public updateManagement(management: Management): Observable<Management[]>{
    return this.http.put<Management[]>(`${this.apiServerUrl}/management/update`, management)
  }
}

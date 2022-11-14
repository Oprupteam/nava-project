import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Leaves } from './leaves';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {
  [x: string]: any;

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addLeaves(leaves: Leaves): Observable<Leaves[]>{
    return this.http.post<Leaves[]>(`${this.apiServerUrl}/leaves/add`,leaves)
  }

  public getAllLeavess(): Observable<Leaves[]>{
    return this.http.get<Leaves[]>(`${this.apiServerUrl}/leaves/all`)
  }
  

  public getLeavesById(leavesId: any): Observable<Leaves[]>{
    return this.http.get<Leaves[]>(`${this.apiServerUrl}/leaves/find/${leavesId}`)
  }

  public deleteLeaves(leavesId: Leaves): Observable<Leaves>{
    return this.http.put<Leaves>(`${this.apiServerUrl}/leaves/delete/${leavesId}`,leavesId);

  }

  public updateLeaves(leaves: Leaves): Observable<Leaves[]>{
    return this.http.put<Leaves[]>(`${this.apiServerUrl}/leaves/update`, leaves)
  }

}

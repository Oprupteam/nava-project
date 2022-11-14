import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vacation } from './vacation';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  [x: string]: any;

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addVacation(vacation: Vacation): Observable<Vacation[]>{
    return this.http.post<Vacation[]>(`${this.apiServerUrl}/vacation/add`,vacation)
  }

  public getAllVacations(): Observable<Vacation[]>{
    return this.http.get<Vacation[]>(`${this.apiServerUrl}/vacation/all`)
  }
  

  public getVacationById(vacationId: any): Observable<Vacation[]>{
    return this.http.get<Vacation[]>(`${this.apiServerUrl}/vacation/find/${vacationId}`)
  }

  public deleteVacation(vacationId: Vacation): Observable<Vacation>{
    return this.http.put<Vacation>(`${this.apiServerUrl}/vacation/delete/${vacationId}`,vacationId);

  }

  public updateVacation(vacation: Vacation): Observable<Vacation[]>{
    return this.http.put<Vacation[]>(`${this.apiServerUrl}/vacation/update`, vacation)
  }

}

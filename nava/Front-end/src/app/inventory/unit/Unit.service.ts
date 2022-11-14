import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unit } from './Unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUnits(): Observable<Unit[]>{
    return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/all`);
  }

  public getUnitById(UnitId: number): Observable<Unit>{
    return this.http.get<Unit>(`${this.apiServerUrl}/unit/find/${UnitId}`);
  }

  public addUnit(Unit: Unit): Observable<Unit>{
    return this.http.post<Unit>(`${this.apiServerUrl}/unit/add`, Unit);
  }

  public updateUnit(Unit: Unit): Observable<Unit>{
    return this.http.put<Unit>(`${this.apiServerUrl}/unit/update`, Unit);
  }

  public deleteUnit(Unit: Unit): Observable<Unit>{
    return this.http.put<Unit>(`${this.apiServerUrl}/unit/delete`, Unit);
  }
}

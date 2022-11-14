import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Benefit } from './benefit';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  [x: string]: any;

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public addBenefit(benefit: Benefit): Observable<Benefit[]>{
    return this.http.post<Benefit[]>(`${this.apiServerUrl}/benefits/add`,benefit)
  }

  public getAllBenefits(): Observable<Benefit[]>{
    return this.http.get<Benefit[]>(`${this.apiServerUrl}/benefits/all`)
  }
  

  public getBenefitById(benefitsId: any): Observable<Benefit[]>{
    return this.http.get<Benefit[]>(`${this.apiServerUrl}/benefits/find/${benefitsId}`)
  }

  public deleteBenefit(benefitsId: Benefit): Observable<Benefit>{
    return this.http.put<Benefit>(`${this.apiServerUrl}/benefits/delete/${benefitsId}`,benefitsId);

  }

  public updateBenefit(benefit: Benefit): Observable<Benefit[]>{
    return this.http.put<Benefit[]>(`${this.apiServerUrl}/benefits/update`, benefit)
  }

}

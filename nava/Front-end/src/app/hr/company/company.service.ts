import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Company } from './company';
import { Partner } from './partner';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.apiServerUrl}/file/upload`, formData, {
      reportProgress: true, observe: 'events'});
  }

  public addCompany(company: Company): Observable<Company[]>{
    return this.http.post<Company[]>(`${this.apiServerUrl}/company/add`,company)
  }
  public addPartner(partner: Partner): Observable<Partner[]>{
    return this.http.post<Partner[]>(`${this.apiServerUrl}/partner/add`,partner)
  }

  public getAllPartner(): Observable<Partner[]>{
    return this.http.get<Partner[]>(`${this.apiServerUrl}/partner/all`)
  }

  public deletePartner(partnerId: Partner): Observable<Partner>{
    return this.http.put<Partner>(`${this.apiServerUrl}/partner/delete/${partnerId}`,partnerId);
  }

  public getAllCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.apiServerUrl}/company/all`)
  }

  public getPartnerById(partnerId: any): Observable<Partner[]>{
    return this.http.get<Partner[]>(`${this.apiServerUrl}/partner/find/${partnerId}`)
  }

  public updatePartner(partner: Partner): Observable<Partner[]>{
    return this.http.put<Partner[]>(`${this.apiServerUrl}/partner/update`, partner)
  }

}

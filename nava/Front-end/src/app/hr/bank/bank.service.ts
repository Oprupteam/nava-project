import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobTitle } from '../job-title/job-title';
import { Bank } from './bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) { }

  public addBank(bank: Bank): Observable<Bank[]>{
    return this.http.post<Bank[]>(`${this.apiServerUrl}/bank/add`,bank)
  }

  public getAllBanks(): Observable<Bank[]>{
    return this.http.get<Bank[]>(`${this.apiServerUrl}/bank/all`)
  }
  public getAllJobtitls(): Observable<JobTitle[]>{
    return this.http.get<JobTitle[]>(`${this.apiServerUrl}/jobTitle/all`)
  }

  public getBankById(bankId: any): Observable<Bank[]>{
    return this.http.get<Bank[]>(`${this.apiServerUrl}/bank/find/${bankId}`)
  }

  public deleteBank(bankId: Bank): Observable<Bank>{
    return this.http.put<Bank>(`${this.apiServerUrl}/bank/delete/${bankId}`,bankId);

  }

  public updateBank(bank: Bank): Observable<Bank[]>{
    return this.http.put<Bank[]>(`${this.apiServerUrl}/bank/update`, bank)
  }
}

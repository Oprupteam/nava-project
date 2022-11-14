import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartAccount } from './chart-account';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  public getCoa(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/chartAccount/all`);
  }
  public addAcount(coa: ChartAccount): Observable<ChartAccount>{
    return this.http.post<ChartAccount>(`${this.apiServerUrl}/chartAccount/add`, coa);
  }
  public getAccountById(accountId: number): Observable<ChartAccount>{
    return this.http.get<ChartAccount>(`${this.apiServerUrl}/chartAccount/find/${accountId}`);
  }
  public getAccountsByParent(ParentId): Observable<ChartAccount[]>{
    return this.http.get<ChartAccount[]>(`${this.apiServerUrl}/chartAccount/findSubParent/${ParentId}`);
  }
  public getAccountByName(accountName: string): Observable<ChartAccount>{
    return this.http.get<ChartAccount>(`${this.apiServerUrl}/chartAccount/findName/${accountName}`);
  }
  public getAccountByType(accountType: string): Observable<ChartAccount>{

    return this.http.get<ChartAccount>(`${this.apiServerUrl}/chartAccount/findType/${accountType}`);
  }
  public updateAccount(accountId: number): Observable<ChartAccount>{

    return this.http.put<ChartAccount>(`${this.apiServerUrl}/chartAccount/update`, accountId);
  }

  public getAccountByCode(accountCode: string): Observable<ChartAccount>{
    return this.http.get<ChartAccount>(`${this.apiServerUrl}/chartAccount/findCode/${accountCode}`);
  }
   public getAccountByParent(accountId: number): Observable<ChartAccount[]>{
    return this.http.get<ChartAccount[]>(`${this.apiServerUrl}/chartAccount/findParent/${accountId}`);
  }

}

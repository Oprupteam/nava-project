import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from './Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getStores(): Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiServerUrl}/store/all`);
  }

  public getStoreById(storeId: number): Observable<Store>{
    return this.http.get<Store>(`${this.apiServerUrl}/store/find/${storeId}`);
  }

  public addStore(store: Store): Observable<Store>{
    return this.http.post<Store>(`${this.apiServerUrl}/store/add`, store);
  }

  public updateStore(store: Store): Observable<Store>{
    return this.http.put<Store>(`${this.apiServerUrl}/store/update`, store);
  }

  public deleteStore(store: Store): Observable<Store>{
    return this.http.put<Store>(`${this.apiServerUrl}/store/delete`, store);
  }
}

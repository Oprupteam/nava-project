import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Items } from './Items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getAllItems(): Observable<Items[]>{
    return this.http.get<Items[]>(`${this.apiServerUrl}/items/all`);
  }

  // Upload Image
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.apiServerUrl}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public getItemsById(itemsId: number): Observable<Items>{
    return this.http.get<Items>(`${this.apiServerUrl}/items/find/${itemsId}`);
  }

  public addItems(item: Items): Observable<Items>{
    return this.http.post<Items>(`${this.apiServerUrl}/items/add`, item);
  }

  public updateItems(item: Items): Observable<Items>{
    return this.http.put<Items>(`${this.apiServerUrl}/items/update`, item);
  }

  public deleteItems(item: Items): Observable<Items>{
    return this.http.put<Items>(`${this.apiServerUrl}/items/delete`, item);
  }

  public count():any{
    return this.http.get(`${this.apiServerUrl}/items/count`)
  }

}

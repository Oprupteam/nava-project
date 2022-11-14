import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LpoByItemDetails } from '../local-purchace-order/LpoByItemDetails';
import { ItemRequestDetails } from './ItemRequestDetails';
import { ItemRequest } from './itemRquest';

@Injectable({
  providedIn: 'root'
})
export class ItemRequestService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getAllItemRequest(): Observable<ItemRequest[]>{
    return this.http.get<ItemRequest[]>(`${this.apiServerUrl}/itemRequest/all`);
  }

  public getItemRequestById(itemRequestId: number): Observable<ItemRequest>{
    return this.http.get<ItemRequest>(`${this.apiServerUrl}/itemRequest/find/${itemRequestId}`);
  }


  public addItemRequest(itemRequest: ItemRequest): Observable<ItemRequest>{
    return this.http.post<ItemRequest>(`${this.apiServerUrl}/itemRequest/add`, itemRequest);
  }

  public updateItemRequest(itemRequest: ItemRequest): Observable<ItemRequest>{
    return this.http.put<ItemRequest>(`${this.apiServerUrl}/itemRequest/update`, itemRequest);
  }

  public deleteItemRequest(itemRequest: ItemRequest): Observable<ItemRequest>{
    return this.http.put<ItemRequest>(`${this.apiServerUrl}/itemRequest/delete`, itemRequest);
  }
  public getAllItemRequestDetails(): Observable<ItemRequestDetails[]>{
    return this.http.get<ItemRequestDetails[]>(`${this.apiServerUrl}/itemRequestDetails/all`);
  }

  public getItemRequestDetailsById(itemRequestDetailsId: number): Observable<ItemRequestDetails>{
    return this.http.get<ItemRequestDetails>(`${this.apiServerUrl}/itemRequestDetails/find/${itemRequestDetailsId}`);
  }
  public getItemRequestDetailsByItemRequest(itemRequestDetailsId: number): Observable<LpoByItemDetails>{
    return this.http.get<LpoByItemDetails>(`${this.apiServerUrl}/itemRequestDetails/findCode/${itemRequestDetailsId}`);
  }


  public addItemRequestDetails(itemRequestDetails: ItemRequestDetails): Observable<ItemRequestDetails>{
    return this.http.post<ItemRequestDetails>(`${this.apiServerUrl}/itemRequestDetails/add`, itemRequestDetails);
  }

  public updateItemRequestDetails(itemRequestDetails: ItemRequestDetails): Observable<ItemRequestDetails>{
    return this.http.put<ItemRequestDetails>(`${this.apiServerUrl}/itemRequestDetails/update`, itemRequestDetails);
  }

  public deleteItemRequestDetails(itemRequestDetails: ItemRequestDetails): Observable<ItemRequestDetails>{
    return this.http.put<ItemRequestDetails>(`${this.apiServerUrl}/itemRequestDetails/delete`, itemRequestDetails);
  }

  public count():any{
    return this.http.get(`${this.apiServerUrl}/itemRequest/count`)
  }


}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {PurchaseInvoices, PurchaseInvoicesItem } from './PurchaseInvoices';
import { PurchaseInvoicesDetails } from './PurchaseInvoicesDetails';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoicesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getAllPurchaseInvoices(): Observable<PurchaseInvoices[]>{
    return this.http.get<PurchaseInvoices[]>(`${this.apiServerUrl}/purchaseInvoices/all`);
  }

  public getPurchaseInvoicesById(localPurchaseOrderId: number): Observable<PurchaseInvoices>{
    return this.http.get<PurchaseInvoices>(`${this.apiServerUrl}/purchaseInvoices/find/${localPurchaseOrderId}`);
  }
  public getPurchaseInvoicesDetailsById(localPurchaseOrderId: number): Observable<PurchaseInvoicesDetails>{
    return this.http.get<PurchaseInvoicesDetails>(`${this.apiServerUrl}/purchaseInvoicesDetails/find/${localPurchaseOrderId}`);
  }

  public addPurchaseInvoices(purchaseInvoices: PurchaseInvoices): Observable<PurchaseInvoices>{
    return this.http.post<PurchaseInvoices>(`${this.apiServerUrl}/purchaseInvoices/add`, purchaseInvoices);
  }
  public addLocalPurchaceOrderItem(purchaseInvoicesItem: PurchaseInvoicesItem): Observable<PurchaseInvoicesItem>{
    return this.http.post<PurchaseInvoicesItem>(`${this.apiServerUrl}/purchaseInvoicesItem/add`, purchaseInvoicesItem);
  }

  public updatePurchaseInvoices(purchaseInvoices: PurchaseInvoicesDetails): Observable<PurchaseInvoicesDetails>{
    return this.http.put<PurchaseInvoicesDetails>(`${this.apiServerUrl}/purchaseInvoices/update`, purchaseInvoices);
  }
  public updatePurchaseInvoicesDetails(purchaseInvoices: PurchaseInvoicesDetails): Observable<PurchaseInvoicesDetails>{
    return this.http.put<PurchaseInvoicesDetails>(`${this.apiServerUrl}/purchaseInvoicesDetails/update`, purchaseInvoices);
  }

  public deletePurchaseInvoices(purchaseInvoices: PurchaseInvoices): Observable<PurchaseInvoices>{
    return this.http.put<PurchaseInvoices>(`${this.apiServerUrl}/purchaseInvoices/delete`, purchaseInvoices);
  }

  public count():any{
    return this.http.get(`${this.apiServerUrl}/purchaseInvoices/count`)
  }


  public addPurchaseInvoicesDetails(purchaseInvoicesDetails: PurchaseInvoicesDetails): Observable<PurchaseInvoicesDetails>{
    return this.http.post<PurchaseInvoicesDetails>(`${this.apiServerUrl}/purchaseInvoicesDetails/add`, purchaseInvoicesDetails);
  }

  public getPurchaseInvoicesDetailsByPurchaseInvoicesId(purchaseInvoicesId: number): Observable<PurchaseInvoicesDetails>{
    return this.http.get<PurchaseInvoicesDetails>(`${this.apiServerUrl}/purchaseInvoicesDetails/findCode/${purchaseInvoicesId}`);
  }
  public getPurchaseInvoicesDetailsByItemRequestDetailsId(ItemRequestId: number): Observable<PurchaseInvoicesDetails>{
    return this.http.get<PurchaseInvoicesDetails>(`${this.apiServerUrl}/purchaseInvoicesDetails/findCodeByByItemRequestDetailsId/${ItemRequestId}`);
  }




  public getLocalPurchaseDetailsByItemRequest(ItemRequestId: number): Observable<PurchaseInvoicesDetails>{
    return this.http.get<PurchaseInvoicesDetails>(`${this.apiServerUrl}/purchaseInvoicesDetails/findCodeByItemRequestId/${ItemRequestId}`);
  }

  public deletePurchaseInvoicesDetails(purchaseInvoicesDetails: PurchaseInvoicesDetails): Observable<PurchaseInvoicesDetails>{
    return this.http.put<PurchaseInvoicesDetails>(`${this.apiServerUrl}/purchaseInvoicesDetails/delete`, purchaseInvoicesDetails);
  }

  public getPurchaseInvoicesDetailsByPurchaseInvoices(localPurchaseOrderId: number): Observable<PurchaseInvoicesItem>{
    return this.http.get<PurchaseInvoicesItem>(`${this.apiServerUrl}/purchaseInvoicesItem/findCode/${localPurchaseOrderId}`);
  }

}

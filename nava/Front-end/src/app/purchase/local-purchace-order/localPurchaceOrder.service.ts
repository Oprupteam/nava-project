import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalPurchaseOrder } from './LocalPurchaceOrder';
import { LocalPurchaseOrderDetails } from './LocalPurchaceOrderDetails';
@Injectable({
  providedIn: 'root'
})

export class LocalPurchaceOrderService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getAllLocalPurchaceOrder(): Observable<LocalPurchaseOrder[]>{
    return this.http.get<LocalPurchaseOrder[]>(`${this.apiServerUrl}/localPurchaceOrder/all`);
  }

  public getLocalPurchaseOrderById(localPurchaseOrderId: number): Observable<LocalPurchaseOrder>{
    return this.http.get<LocalPurchaseOrder>(`${this.apiServerUrl}/localPurchaceOrder/find/${localPurchaseOrderId}`);
  }
  public getLocalPurchaseOrderDetailsById(localPurchaseOrderId: number): Observable<LocalPurchaseOrderDetails>{
    return this.http.get<LocalPurchaseOrderDetails>(`${this.apiServerUrl}/localPurchaceOrderDetails/find/${localPurchaseOrderId}`);
  }

  public addLocalPurchaceOrder(localPurchaceOrder: LocalPurchaseOrder): Observable<LocalPurchaseOrder>{
    return this.http.post<LocalPurchaseOrder>(`${this.apiServerUrl}/localPurchaceOrder/add`, localPurchaceOrder);
  }

  public updateLocalPurchaceOrder(localPurchaceOrder: LocalPurchaseOrderDetails): Observable<LocalPurchaseOrderDetails>{
    return this.http.put<LocalPurchaseOrderDetails>(`${this.apiServerUrl}/localPurchaceOrder/update`, localPurchaceOrder);
  }
  public updateLocalPurchaceOrderDetails(localPurchaceOrder: LocalPurchaseOrderDetails): Observable<LocalPurchaseOrderDetails>{
    return this.http.put<LocalPurchaseOrderDetails>(`${this.apiServerUrl}/localPurchaceOrderDetails/update`, localPurchaceOrder);
  }

  public deleteLocalPurchaceOrder(localPurchaceOrder: LocalPurchaseOrder): Observable<LocalPurchaseOrder>{
    return this.http.put<LocalPurchaseOrder>(`${this.apiServerUrl}/localPurchaceOrder/delete`, localPurchaceOrder);
  }
  public count():any{
    return this.http.get(`${this.apiServerUrl}/localPurchaceOrder/count`)
  }


  public addLocalPurchaceOrderDetails(localPurchaceOrderDetails: LocalPurchaseOrderDetails): Observable<LocalPurchaseOrderDetails>{
    return this.http.post<LocalPurchaseOrderDetails>(`${this.apiServerUrl}/localPurchaceOrderDetails/add`, localPurchaceOrderDetails);
  }

  public getLocalPurchaceOrderDetailsByLocalPurchaceOrderId(localPurchaceOrderId: number): Observable<LocalPurchaseOrderDetails>{
    return this.http.get<LocalPurchaseOrderDetails>(`${this.apiServerUrl}/localPurchaceOrderDetails/findCode/${localPurchaceOrderId}`);
  }
  public getLocalPurchaceOrderDetailsByItemRequestDetailsId(ItemRequestId: number): Observable<LocalPurchaseOrderDetails>{
    return this.http.get<LocalPurchaseOrderDetails>(`${this.apiServerUrl}/localPurchaceOrderDetails/findCodeByByItemRequestDetailsId/${ItemRequestId}`);
  }




  public getLocalPurchaseDetailsByItemRequest(ItemRequestId: number): Observable<LocalPurchaseOrderDetails>{
    return this.http.get<LocalPurchaseOrderDetails>(`${this.apiServerUrl}/localPurchaceOrderDetails/findCodeByItemRequestId/${ItemRequestId}`);
  }

  public deleteLocalPurchaceOrderDetails(localPurchaceOrderDetails: LocalPurchaseOrderDetails): Observable<LocalPurchaseOrderDetails>{
    return this.http.put<LocalPurchaseOrderDetails>(`${this.apiServerUrl}/localPurchaceOrderDetails/delete`, localPurchaceOrderDetails);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vendor } from './Vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getAllVendor(): Observable<Vendor[]>{
    return this.http.get<Vendor[]>(`${this.apiServerUrl}/vendor/all`);
  }

  public getVendorById(vendorId: number): Observable<Vendor>{
    return this.http.get<Vendor>(`${this.apiServerUrl}/vendor/find/${vendorId}`);
  }


  public addVendor(vendor: Vendor): Observable<Vendor>{
    return this.http.post<Vendor>(`${this.apiServerUrl}/vendor/add`, vendor);
  }

  public updateVendor(vendor: Vendor): Observable<Vendor>{
    return this.http.put<Vendor>(`${this.apiServerUrl}/vendor/update`, vendor);
  }

  public deleteVendor(vendor: Vendor): Observable<Vendor>{
    return this.http.put<Vendor>(`${this.apiServerUrl}/vendor/delete`, vendor);
  }

}


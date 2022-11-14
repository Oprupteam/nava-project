import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubCategory } from './Subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSubCategories(): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`${this.apiServerUrl}/subCategory/all`);
  }

  public getSubCategoryById(SubCategoryId: number): Observable<SubCategory>{
    return this.http.get<SubCategory>(`${this.apiServerUrl}/subCategory/find/${SubCategoryId}`);
  }
  public getSubCategoryByCategory(SubCategoryId: number): Observable<SubCategory>{
    return this.http.get<SubCategory>(`${this.apiServerUrl}/subCategory/subCategoryByCategory/${SubCategoryId}`);
  }

  public addSubCategory(SubCategory: SubCategory): Observable<SubCategory>{
    return this.http.post<SubCategory>(`${this.apiServerUrl}/subCategory/add`, SubCategory);
  }

  public updateSubCategory(SubCategory: SubCategory): Observable<SubCategory>{
    return this.http.put<SubCategory>(`${this.apiServerUrl}/subCategory/update`, SubCategory);
  }

  public deleteSubCategory(SubCategory: SubCategory): Observable<SubCategory>{
    return this.http.put<SubCategory>(`${this.apiServerUrl}/subCategory/delete`, SubCategory);
  }
}

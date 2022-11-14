import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiServerUrl}/category/all`);
  }

  public getCategoriesById(categoryId: number): Observable<Category>{
    return this.http.get<Category>(`${this.apiServerUrl}/category/find/${categoryId}`);
  }

  public addCategories(category: Category): Observable<Category>{
    return this.http.post<Category>(`${this.apiServerUrl}/category/add`, category);
  }

  public updateCategories(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.apiServerUrl}/category/update`, category);
  }

  public deleteCategories(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.apiServerUrl}/category/delete`, category);
  }
}


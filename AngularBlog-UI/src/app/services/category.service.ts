import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl: string = 'https://localhost:44361/api/Categories';
  public loading: boolean = true; //yüklemelerde kullanacağız
  constructor(private apiClient: HttpClient) {}

  public getCategories() {
    return this.apiClient.get<Category[]>(this.apiUrl).pipe(
      tap((x) => {
        this.loading = false; //veri gelirse loading dursun
      })
    );
  }
  public getCategoryById(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.apiClient.get<Category>(url).pipe(
      tap((x) => {
        this.loading = false; //veri gelirse loading dursun
      })
    );
  }
}

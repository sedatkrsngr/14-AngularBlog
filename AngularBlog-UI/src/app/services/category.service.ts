import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl: string = 'https://localhost:44361/api/Categories';
  constructor(private apiClient: HttpClient) {}

  public getCategories() {
    return this.apiClient.get<Category[]>(this.apiUrl);
  }
  public getCategoryById(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.apiClient.get<Category>(url);
  }
}

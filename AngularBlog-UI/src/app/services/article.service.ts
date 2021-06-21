import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePagenation } from '../models/article-pagenation';
import { tap } from 'rxjs/operators'; //tab veri çekilince arada işlem yapmak için kullanılır
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public loading: boolean = true; //yüklemelerde kullanacağız
  private apiUrl: string = 'https://localhost:44361/api/Articles';
  constructor(private apiClient: HttpClient) {}

  public getArticles(page: number, pageSize: number) {
    let url = `${this.apiUrl}/${page}/${pageSize}`;

    return this.apiClient.get<ArticlePagenation>(url).pipe(
      tap((x) => {
        this.loading = false; //veri gelirse loading dursun
      })
    );
  }
  //https://localhost:44361/api/Articles/6
  public getArticle(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.apiClient.get<Article>(url).pipe(
      tap((x) => {
        this.loading = false; //veri gelirse loading dursun
      })
    );;
  }

  getArticlesWithCategory(categoryId: number, page: number, pageSize: number) {
        let url = `${this.apiUrl}/GetArticlesWithCategory/${categoryId}/${page}/${pageSize}`;
        return this.apiClient.get<ArticlePagenation>(url).pipe(
          tap((x) => {
            this.loading = false; //veri gelirse loading dursun
          })
        );
  }
  getSearchArticles(searchText: string, page: number, pageSize: number) {
    let url = `${this.apiUrl}/SearchArticles/${searchText}/${page}/${pageSize}`;

    return this.apiClient.get<ArticlePagenation>(url).pipe(
      tap(x => {
        this.loading = false;
      })
    );
  }

}



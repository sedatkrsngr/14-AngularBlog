import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePagenation } from '../models/article-pagenation';
import { tap } from 'rxjs/operators'; //tab veri çekilince arada işlem yapmak için kullanılır
import { Article } from '../models/article';
import { Archive } from '../models/archive';

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
    );
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
      tap((x) => {
        this.loading = false;
      })
    );
  }

  getArticlesMostView() {
    let url = `${this.apiUrl}/GetArticlesByMostView`;
    return this.apiClient.get<Article[]>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }
  getArticlesArchive() {
    let url = `${this.apiUrl}/GetArticlesArchive`;
    return this.apiClient.get<Archive[]>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }
  getArticleArchiveList(
    year: number,
    month: number,
    page: number,
    pageSize: number
  ) {
    let api = `${this.apiUrl}/GetArticleArchiveList/${year}/${month}/${page}/${pageSize}`;

    return this.apiClient.get<ArticlePagenation>(api).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }

  ArticleViewCountUp(id:number){//sayfa görüntülenmesi
    let api = `${this.apiUrl}/ArticleViewCountUp/${id}`;
    return this.apiClient.get(api);
  }
  getArticlesWithoutPagination(){
    let api=this.apiUrl

    return this.apiClient.get<Article[]>(api);
  }
  addArticle(article: Article) {
    return this.apiClient.post(this.apiUrl, article);
  }
  updateArticle(id: number, article: Article) {
    return this.apiClient.put(`${this.apiUrl}/${id}`, article);
  }

  deleteArticle(id: number) {
    return this.apiClient.delete(`${this.apiUrl}/${id}`);
  }
  saveArticlePicture(image : any) {
    return this.apiClient.post<any>(
      `${this.apiUrl}/SaveArticlePicture`,
      image
    );
  }
}

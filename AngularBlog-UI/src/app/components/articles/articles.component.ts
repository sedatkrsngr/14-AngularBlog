import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  //home.component.ts den gelen değerleri yakalarız Input ile
  @Input() totalCount: number = 0;
  @Input() articles: Article[] = [];
  @Input() page: number = 1;
  @Input() pageSize: number = 5;
  @Input() loadingItem: number = 5;
  @Input() typeList!: string;
  default_article: string = 'assets/article_empty.jpg';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public articleService: ArticleService
  ) {}

  ngOnInit(): void {
    //sayfa yüklenildiğinde de loading çalışssın
    this.articleService.loading = true;
  }

  pageChanged(event: Number) {
    //bu methodta ekleyeceğimiz eventten gelen değerleri yakalayacağız ve urli buna göre güncelleyeceğiz
    this.articleService.loading = true;
    this.page = Number(event); //diyelim ki 2 numaralı sayfa geçiş butonuna basıcaz o zaman sayfa aşağıdaki gibi güncellenecek
    switch (this.typeList) {
      case 'home':
        this.router.navigateByUrl(`/sayfa/${this.page}`); //localhost:4200/sayfa/2
        break;
      case 'category':
        let categoryName = this.route.snapshot.paramMap.get('name');
        let categoryId = this.route.snapshot.paramMap.get('id');
        this.router.navigateByUrl(
          `/kategori/${categoryName}/${categoryId}/sayfa/${this.page}`
        );
        break;
      case 'search':
        let searchText = this.route.snapshot.queryParamMap.get('s');
        this.router.navigateByUrl(`/arama/sayfa/${this.page}?s=${searchText}`);
        break;
      case 'archive':
        let year = this.route.snapshot.paramMap.get('year');
        let month = this.route.snapshot.paramMap.get('month');
        this.router.navigateByUrl(`/arsiv/${year}/${month}/sayfa/${this.page}`);
        break;

      default:
        break;
    }
  }

  //loading itemdan gelen sayıyı dizi yapmalıyız ki html tarafında for olarak kullanalım
  createRange() {
    var items: number[] = [];
    for (var i = 0; i < this.loadingItem; i++) {
      items.push(i);
    }
    return items;
  }
}

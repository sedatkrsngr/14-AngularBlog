import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-category-articles',
  templateUrl: './category-articles.component.html',
  styleUrls: ['./category-articles.component.css'],
})
export class CategoryArticlesComponent implements OnInit, OnDestroy {
  //değişkenleri mutlaka varsayılan değerli başlangıçta vermeliyiz
  page: number = 1; //varsayılan değer
  pageSize: number = 5; //varsayılan değer
  articles!: Article[];
  totalCount!: number;
  loadingItem: number = 5; //normalde 8 datamız varsa ilk sayfada 5 2.sayfada ise 3 data olacağından. Loading pagecontent 3 tane göstersin
  subscription: any;
  categoryId!: number;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    if (this.subscription != null) this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleService.loading = true;
      if (params.get('id')) {
        this.categoryId = Number(params.get('id')); //url de id varsa categoryID ye ata
      }
      if (params.get('page')) {
        this.page = Number(params.get('page'));
      }
      if (this.totalCount > 0) {
        if (this.totalCount >= this.page * this.pageSize) {
          this.loadingItem = 5;
        }
        else{//2*5-8+1=3  ilk sayfa 5 2. sayfa 3
          this.loadingItem=(this.page*this.pageSize)-this.totalCount+1;//bu şekilde tüm sayfalar dolduktan sonra en son sayfada kalacak olan data sayısını bilebilirim
        }
      }
      this.articles = [];
      this.totalCount = 0;
      this.subscription=this.articleService.getArticlesWithCategory(this.categoryId,this.page,this.pageSize).subscribe((data) => {
        this.articles = data.articles;
        this.totalCount=data.totalCount;
      });
    });
  }
}

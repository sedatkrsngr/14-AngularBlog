import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute } from '@angular/router'; //sayfalama için gerekli

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //değişkenleri mutlaka varsayılan değerli başlangıçta vermeliyiz
  page: number = 1; //varsayılan değer
  pageSize: number = 5; //varsayılan değer
  articles!: Article[];
  totalCount!: number ;
  loadingItem!: number; //normalde 8 datamız varsa ilk sayfada 5 2.sayfada ise 3 data olacağından. Loading pagecontent 3 tane göstersin

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //aşağıda url dinliyoruz değiştiğinde sayfayı yenilemeden işlem yapar. articles componentte olan her değişiklikte bu method çalışacak ve service yeniden çağırılacak
    this.route.paramMap.subscribe((params) => {
      if (params.get('page')) {
        //page app-routing.module içerisinde tanımladığımız dinamik bir değerdir
        this.page = Number(params.get('page'));
      }
      //sayfadaki  localhost:4200/sayfa/page gibi ise yukardaki if'e girecek  ve page parametresine göre service çağıralacak eğer localhost:4200/ direkt çağırılırsa varsayılan page 1 pageSize=5 olarak çağırılacaktır
      if (this.totalCount > 0) {
        if (this.totalCount >= this.page * this.pageSize) {
          this.loadingItem = 5;
        }
        else{
          this.loadingItem=(this.page*this.pageSize)-this.totalCount;//bu şekilde tüm sayfalar dolduktan sonra en son sayfada kalacak olan data sayısını bilebilirim
        }
      }
      this.articles = []; //service çağırılmadan önce temizleme işlemi yapılır
      this.totalCount = 0;
      this.articleService
        .getArticles(this.page, this.pageSize)
        .subscribe((data) => {
          this.articles = data.articles;
          this.totalCount = data.totalCount;
        });
    });
  }
}

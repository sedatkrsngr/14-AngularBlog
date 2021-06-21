import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-menu-article-most-view',
  templateUrl: './menu-article-most-view.component.html',
  styleUrls: ['./menu-article-most-view.component.css'],
})
export class MenuArticleMostViewComponent implements OnInit {
  articles: Article[] = [];
  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.loading = true;
    this.articleService.getArticlesMostView().subscribe((data) => {
      this.articles = data;
    });
  }
}

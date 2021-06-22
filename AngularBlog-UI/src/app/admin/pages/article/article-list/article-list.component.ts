import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
//MatPaginator ve MatTableDataSource material.module içerisinde tanımlanmalı ve export edilmeli
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';//MatTableModule material.module tarafında kullanılmalı
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
    //https://material.angular.io/components/table/overview sayfada kullanımı mevcut
  //servisten istediğimiz değerlerle aynı olmalı
  displayedColumns: string[] = [
    "picture",
    "title",
    "category",
    "commentCount",
    "viewCount",
    "publishDate",
    "action"
  ];
  dataSource: any;
  articles!: Article[];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticlesWithoutPagination().subscribe(data => {
      this.articles = data;
      this.dataSource = new MatTableDataSource<Article>(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteArticle(id : number) {
    this.articleService.deleteArticle(id).subscribe(data => {
      let article = this.articles.filter(x => x.id == id)[0];
      let index = this.articles.indexOf(article);//article içindeki indexi nedir

      this.articles.splice(index, 1);//articles içierisindeki dizini kaldırıyoruz
      this.dataSource = new MatTableDataSource<Article>(this.articles);//daha sonra datasoruce güncelleri tekrar

      this.dataSource.paginator = this.paginator;
    });
  }

}

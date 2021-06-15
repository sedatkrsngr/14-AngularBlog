import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Category } from 'src/app/models/category';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article!: Article;
  category!: Category;
  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = Number(this.route.snapshot.paramMap.get('id')); //Anlık olarak gideceğimiz linkin içindeki id değerini alır. Title değeri de var ama o bizi ilgilendirmiyor
      this.articleService.getArticle(id).subscribe(data=>{
        this.article = data;
        console.log(data);
        this.category = data.category;
      });
    });
  }
}

import { Article } from "./article";

export class ArticlePagenation {
  totalCount:number;
  articles:Article[];
  constructor(totalCount: number, articles: Article[]) {
    this.totalCount = totalCount;
    this.articles = articles;
  }
}
//apiden sayfalama için dönen veri

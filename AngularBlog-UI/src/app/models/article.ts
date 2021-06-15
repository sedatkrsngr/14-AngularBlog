import { Category } from "./category";

export class Article {
  id:number;
  title:string;
  contentMain:string;
  contentSummary:string;
  publishDate:Date;
  picture:string;
  viewCount:number;
  commentCount:number;
  category:Category;
  constructor(id: number, title: string,contentMain:string,contentSummary:string,publishDate:Date,picture:string,viewCount:number,commentCount:number,category:Category) {
    this.id = id;
    this.title = title;
    this.contentMain = contentMain;
    this.contentSummary = contentSummary;
    this.publishDate = publishDate;
    this.picture = picture;
    this.viewCount = viewCount;
    this.commentCount = commentCount;
    this.category = category;

  }
}

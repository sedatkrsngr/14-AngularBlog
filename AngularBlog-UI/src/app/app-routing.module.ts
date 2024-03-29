import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './main/pages/home/home.component';
import { AboutMeComponent } from './main/pages/about-me/about-me.component';
import { ContactComponent } from './main/pages/contact/contact.component';
import { MainLayoutComponent } from './main/layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { ArticleComponent } from './main/pages/article/article.component';
import { CategoryArticlesComponent } from './main/pages/category-articles/category-articles.component';
import { SearchComponent } from './main/pages/search/search.component';
import { ArchiveComponent } from './main/pages/archive/archive.component';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';
import { ArticleAddComponent } from './admin/pages/article/article-add/article-add.component';
import { ArticleListComponent } from './admin/pages/article/article-list/article-list.component';
import { ArticleUpdateComponent } from './admin/pages/article/article-update/article-update.component';
import { AdminArticleComponent } from './admin/pages/article/admin-article/admin-article.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'sayfa/:page',//:page dinamik değerden gelecek demek
        component: HomeComponent,
      },
      {
        path: 'makale/:title/:id',//:id ve title dinamik değerden gelecek demek daha düzgün bir link görünümü olur
        component: ArticleComponent,
      },
      {
        path: 'kategori/:name/:id',//ilk sayfada sayfa url de yazmasına gerek yok butona basınca sayfa yazsın
        component: CategoryArticlesComponent,
      },
      {
        path: 'kategori/:name/:id/sayfa/:page',//kategori/:name/:id ye göre gelen veri articles içerisindeki sayfalamayla geleceği için sayfa butonlarına bastığımızda bu şekilde bir sayfa gelmesini witc case ile sağladık. Routing tarafını da burada belirledik
        component: CategoryArticlesComponent,
      },
      {
        path: 'arama/sayfa/:page',//arama queryString üzerinden yakalayacağız o yüzden page dışında dinamik değişken tanımlamaya gerek yok
        component: SearchComponent, //örn www.mysite.com/arama/sayfa/1?s=asp-net
      },
      {//ilk sayfada sayfa 1 demesine gerek yok
        path: 'arsiv/:year/:month',
        component: ArchiveComponent,
      },
      {
        path: 'arsiv/:year/:month/sayfa/:page',
        component: ArchiveComponent,
      },
      {
        path: 'hakkimizda',
        component: AboutMeComponent,
      },
      {
        path: 'iletisim',
        component: ContactComponent,
      },
    ],
  },
  {
    //www.mysite.com/admin
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'Anasayfa',
        component: AdminHomeComponent,
      },
      //admin/makale/.. olacağından makale için de childrenlar olacak
      {
        path: 'makale',
        component: AdminArticleComponent,
        children:[
          {
            path: 'ekle',
            component: ArticleAddComponent,
          },
          {
            path: 'listele',
            component: ArticleListComponent,
          },
          {
            path: 'güncelle/:id',
            component: ArticleUpdateComponent,
          },
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

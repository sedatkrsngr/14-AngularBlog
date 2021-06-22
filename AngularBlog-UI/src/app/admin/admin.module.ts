import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../modules/material/material.module'; //materiali contect için kullanacağımızdan buraya eklemek mantıklı geldi. NErede kullanacaksak oranın modulüne ekleyebiliriz
import { ComponentModule } from '../components/component.module'; //bu module sayfalarımızda kullanıldığı için buraya ekliyoruz component.module->admin.module->app.module

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminHeaderNavComponent } from './navigations/admin-header-nav/admin-header-nav.component';
import { AdminFooterNavComponent } from './navigations/admin-footer-nav/admin-footer-nav.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
//Article(Makaleler) içinde ekleme,silme,listeleme sayfaları olacağından hepsini article klasöründe birleştirdim.
import { ArticleAddComponent } from './pages/article/article-add/article-add.component';
import { ArticleUpdateComponent } from './pages/article/article-update/article-update.component';
import { ArticleListComponent } from './pages/article/article-list/article-list.component';
import { AdminArticleComponent } from './pages/article/admin-article/admin-article.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderNavComponent,
    AdminFooterNavComponent,
    AdminHomeComponent,
    ArticleAddComponent,
    ArticleUpdateComponent,
    ArticleListComponent,
    AdminArticleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentModule,
    MaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //html de değişkenler kullanıldığında mutlaka olmalı
})
export class AdminModule {}

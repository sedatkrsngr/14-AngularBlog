import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentModule } from '../components/component.module'; //bu module sayfalarımızda kullanıldığı için buraya ekliyoruz component.module->main.module->app.module
import { MaterialModule } from '../modules/material/material.module';//materiali contect için kullanacağımızdan buraya eklemek mantıklı geldi. NErede kullanacaksak oranın modulüne ekleyebiliriz

import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderNavComponent } from './navigations/header-nav/header-nav.component';
import { FooterNavComponent } from './navigations/footer-nav/footer-nav.component';
import { ArticleComponent } from './pages/article/article.component';
import { CategoryArticlesComponent } from './pages/category-articles/category-articles.component';
import { SearchComponent } from './pages/search/search.component';
import { ArchiveComponent } from './pages/archive/archive.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent,
    ContactComponent,
    MainLayoutComponent,
    HeaderNavComponent,
    FooterNavComponent,
    ArticleComponent,
    CategoryArticlesComponent,
    SearchComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //html selector içerisinde custom tanımlar kullanıyorsak bunu eklemeliyiz.
})
export class MainModule {}

//bu componentleri başka componentler kullanmayacağı için export etmiyoruz
//eğer kategory gibi paraçacıklı sayfalarda kullanılan şeyler olsa o zaman exports: kullanırız

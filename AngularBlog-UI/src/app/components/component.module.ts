import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; //router yapısı için eklendi -> [routerLink]="['/kategori', item.name, item.id]
import { NgxPaginationModule } from 'ngx-pagination';

import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { ArticlesComponent } from './articles/articles.component'; //sayfalama butonları için eklendi. Article sayfalama işlemleri için kullanacağız
import { UrlFormatPipe } from '../pipes/url-format.pipe';
import { MenuArticleMostViewComponent } from './menu-article-most-view/menu-article-most-view.component';


@NgModule({
  declarations: [MenuCategoryComponent, ArticlesComponent,UrlFormatPipe, MenuArticleMostViewComponent],
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  exports: [MenuCategoryComponent, ArticlesComponent,UrlFormatPipe,MenuArticleMostViewComponent], //başka yerlerde bu componentin kullanılması için export etmek gerekiyor. Ortak yapılar Articles Search,Home,Kategory işlemlerinde kullanılacak
})
export class ComponentModule {}

//bu module app.module tarafında kalabalık olmasın diye oluşturuldu

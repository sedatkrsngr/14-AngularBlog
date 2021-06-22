//Bu module angular material için kullanacağımız nesneleri tutması için eklendi
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
//Kullandığımız elementlerin mutlaka module olanlarını eklemeliyiz.
//örn article-list -> import {MatTableDataSource} from '@angular/material/table'; için buraya '@angular/material/table' kütüphanesindeki MatTableModule eklenmeli.
//Eğer bir material kullanıyorsak mutlaka o kütüphanenin module olan componenti eklemeliyiz

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ],
  //diğer componentlerin kullanabilmesi için  buraya da eklenir.
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ],
})
export class MaterialModule {}

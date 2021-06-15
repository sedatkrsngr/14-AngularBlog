import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

import { ComponentModule } from '../components/component.module';//bu module sayfalarımızda kullanıldığı için buraya ekliyoruz component.module->admin.module->app.module


import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminHeaderNavComponent } from './navigations/admin-header-nav/admin-header-nav.component';
import { AdminFooterNavComponent } from './navigations/admin-footer-nav/admin-footer-nav.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderNavComponent,
    AdminFooterNavComponent],
  imports: [
    CommonModule,BrowserModule, AppRoutingModule,HttpClientModule,ComponentModule
  ]
})
export class AdminModule { }

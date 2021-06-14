import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './main/pages/home/home.component';
import { AboutMeComponent } from './main/pages/about-me/about-me.component';
import { ContactComponent } from './main/pages/contact/contact.component';
import { MainLayoutComponent } from './main/layout/main-layout/main-layout.component';
import { HeaderNavComponent } from './main/navigations/header-nav/header-nav.component';
import { FooterNavComponent } from './main/navigations/footer-nav/footer-nav.component';

import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { AdminHeaderNavComponent } from './admin/navigations/admin-header-nav/admin-header-nav.component';
import { AdminFooterNavComponent } from './admin/navigations/admin-footer-nav/admin-footer-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutMeComponent,
    ContactComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    HeaderNavComponent,
    AdminHeaderNavComponent,
    FooterNavComponent,
    AdminFooterNavComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

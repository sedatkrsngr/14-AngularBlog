import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
enum MainPage {
  home = 1,
  about_me = 2,
  contact = 3,
}
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit {
  pageActive: MainPage = 0; //Başlangıç olarak enumda olmayan değer verdim.

  constructor(private router: Router) {
    this.router.events.subscribe((x) => {
      //farklı bir sayfaya gittiğini yakalıyoruz burada
      if (x instanceof NavigationEnd) {
        //gittiğimiz sayfanın adından pageActive doldurup main-nav html de active classını ekliyoruz
        if (x.url.indexOf('anasayfa') > 0) {
          this.pageActive = MainPage.home;
        } else if (x.url.indexOf('hakkimizda') > 0) {
          this.pageActive = MainPage.about_me;
        } else if (x.url.indexOf('iletisim') > 0) {
          this.pageActive = MainPage.contact;
        } else {
          this.pageActive = MainPage.home;
        }
      }
    });
  }

  ngOnInit(): void {}

  search(searchText: string) {
    if (searchText == '' || searchText == null || searchText == undefined) {

    } else {
      this.router.navigateByUrl(`arama/sayfa/1?s=${searchText}`);
    } //Başlangıç olarak 1. sayfa görünsün
  }
}

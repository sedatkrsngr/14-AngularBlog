import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './main/pages/home/home.component';
import { AboutMeComponent } from './main/pages/about-me/about-me.component';
import { ContactComponent } from './main/pages/contact/contact.component';
import { MainLayoutComponent } from './main/layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';

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
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

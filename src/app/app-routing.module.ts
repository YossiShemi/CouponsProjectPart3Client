import { CouponsComponent } from './pages/coupons/coupons.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CompanyComponent } from './pages/company/company.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailsComponent } from './pages/details/details.component';
import {Page404Component} from '../app/pages/page404/page404.component';
import { ShellComponent } from './pages/shell/shell.component';
import { CouponDetailsComponent } from './pages/coupon-details/coupon-details.component';

const routes: Routes = [

  {
    path:'',
    component: ShellComponent,
    children: [
      {path: 'homepage', component: HomepageComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'details', component: DetailsComponent },
      {path: 'admin', component: AdminComponent },
      {path: 'company', component: CompanyComponent },
      {path: 'customer', component: CustomerComponent },
      {path: 'coupons/:category', component : CouponsComponent},
      {path: 'coupon/:id', component : CouponDetailsComponent},
      {path: '', redirectTo: 'homepage', pathMatch: 'full'},
    ]
  },
  {path: 'login', component: LoginComponent },
  {path: '**', component: Page404Component}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes 
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

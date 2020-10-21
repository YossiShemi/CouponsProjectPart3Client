import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppbarComponent } from './components/appbar/appbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import {MatDividerModule} from '@angular/material/divider';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailsComponent } from './pages/details/details.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { CompanyComponent } from './pages/company/company.component';
import { CustomerComponent } from './pages/customer/customer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SureDialogComponent } from './components/dialogs/sure-dialog/sure-dialog.component';
import { AddCompanyDialogComponent } from './components/dialogs/add-company-dialog/add-company-dialog.component';
import { UpdateCompanyDialogComponent } from './components/dialogs/update-company-dialog/update-company-dialog.component';
import { AddCustomerDialogComponent } from './components/dialogs/add-customer-dialog/add-customer-dialog.component';
import { UpdateCustomerDialogComponent } from './components/dialogs/update-customer-dialog/update-customer-dialog.component';
import { UpdateCouponDialogComponent } from './components/dialogs/update-coupon-dialog/update-coupon-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AddCouponDialogComponent } from './components/dialogs/add-coupon-dialog/add-coupon-dialog.component';
import { CouponsByCategoryComponent } from './components/coupons-by-category/coupons-by-category.component';
import {MatCardModule} from '@angular/material/card';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { ShellComponent } from './pages/shell/shell.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import { DescriptionDialogComponent } from './components/dialogs/description-dialog/description-dialog.component';
import { CouponsComponent } from './pages/coupons/coupons.component';
import {MatMenuModule} from '@angular/material/menu';
import { CouponDetailsComponent } from './pages/coupon-details/coupon-details.component';


@NgModule({
  declarations: [
    AppComponent,
    AppbarComponent,
    FooterComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    DetailsComponent,
    AdminComponent,
    CompanyComponent,
    CustomerComponent,
    SureDialogComponent,
    AddCompanyDialogComponent,
    UpdateCompanyDialogComponent,
    AddCustomerDialogComponent,
    UpdateCustomerDialogComponent,
    UpdateCouponDialogComponent,
    AddCouponDialogComponent,
    CouponsByCategoryComponent,
    ShellComponent,
    SpinnerComponent,
    ErrorDialogComponent,
    DescriptionDialogComponent,
    CouponsComponent,
    CouponDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    HttpClientModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    IvyCarouselModule,
    MatMenuModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

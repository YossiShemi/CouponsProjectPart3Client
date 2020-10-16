import { Env } from './../../environments/Env';
import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecureService } from './secure.service';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';
import { Coupon } from '../models/Coupon';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url =Env.URL+'customer/';

  constructor(private httpClient: HttpClient, private secure:SecureService,private errorService: ErrorHandlerService) { }

  // Login:
  
  public login(email:string, password:string): Observable<any> {
    return this.httpClient.post<any>(this.url+"/login?email="+email+"&password="+password,null,{observe: 'response', withCredentials: true })
    .pipe( catchError(err => this.errorService.errorHandler(err)));

  }

  //General

  public getCustomerDetails(): Observable<Customer> {
    return this.httpClient.get<Customer>(this.url+'getCustomerDetails')
    .pipe( catchError(err => this.errorService.errorHandler(err)));

  }

  public updateCustomer(customer : Customer): Observable<any>{
    return this.httpClient.put<any>(this.url+"updateCustomer", customer)
    .pipe( catchError(err => this.errorService.errorHandler(err)));

  }
  
  public getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.url+'getAllCoupons')
    .pipe( catchError(err => this.errorService.errorHandler(err)));

  }

  public purchaseCoupon(coupon:Coupon): Observable<any> {
    return this.httpClient.post<any>(this.url+'purchaseCoupon',coupon)
    .pipe( catchError(err => this.errorService.errorHandler(err)));

  }

  public deleteCouponPurchase(id:number): Observable<any> {
    return this.httpClient.delete<any>(this.url+'deleteCouponPurchase/'+id)
    .pipe( catchError(err => this.errorService.errorHandler(err)));

  }

  
}
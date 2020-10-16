import { Env } from './../../environments/Env';
import { Coupon } from './../models/Coupon';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecureService } from './secure.service';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';




@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url =  Env.URL+'company/';

  constructor(private httpClient: HttpClient, private secure:SecureService, private errorService: ErrorHandlerService) { }

  // Login:
  
  public login(email:string, password:string): Observable<any> {
    return this.httpClient.post<any>(this.url+"/login?email="+email+"&password="+password,null,{observe: 'response', withCredentials: true })
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  //General

  public getCompanyDetails(): Observable<Company> {
    return this.httpClient.get<Company>(this.url+'getCompanyDetails')
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public updateCompany(company : Company): Observable<any>{
    return this.httpClient.put<any>(this.url+"updateCompany", company)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public getOneCoupon(id:number): Observable<Coupon> {
    return this.httpClient.get<Coupon>(this.url+'getOneCoupon/'+id)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.url+'getAllCoupons')
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public addCoupon(coupon:Coupon): Observable<any> {
    return this.httpClient.post<any>(this.url+'addCoupon',coupon)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public updateCoupon(coupon:Coupon): Observable<any> {
    return this.httpClient.put<any>(this.url+'updateCoupon',coupon)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }
 
  public deleteCoupon(id:number): Observable<any> {
    return this.httpClient.delete<any>(this.url+'deleteCoupon/'+id)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

}

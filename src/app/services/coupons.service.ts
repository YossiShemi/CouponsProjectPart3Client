import { Env } from './../../environments/Env';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecureService } from './secure.service';
import { Observable } from 'rxjs';
import { Coupon } from '../models/Coupon';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  private url = Env.URL+'general/';

  constructor(private httpClient: HttpClient, private secure:SecureService,private errorService: ErrorHandlerService) { }

  public getOneCoupon(id:number): Observable<Coupon> {
    return this.httpClient.get<Coupon>(this.url+'getOneCoupon/'+id)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.url+'getAllCoupons')
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public getAllCouponsByCategory( category: string): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.url+'getAllCouponsByCategory/'+category)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }
 

  
}

import { Env } from './../../environments/Env';
import { ErrorHandlerService } from './error-handler.service';
import { SecureService } from 'src/app/services/secure.service';
import { Coupon } from './../models/Coupon';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Company} from '../models/Company';
import {Customer} from '../models/Customer';
import {catchError} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private url =  Env.URL+'admin/';

  constructor(private httpClient: HttpClient, private secure:SecureService,  private errorService: ErrorHandlerService) { }

  // Login:
  
  public login(email:string, password:string): Observable<any> {
    return this.httpClient.post<any>(this.url+"/login?email="+email+"&password="+password,null,{observe: 'response', withCredentials: true })
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }
   
  //Companies:

  public addCompany(company : Company): Observable<any>{
    return this.httpClient.post<any>(this.url+"addCompany", company) 
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public updateCompany(company : Company): Observable<any>{
    return this.httpClient.put<any>(this.url+"updateCompany", company)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public deleteCompany(id : number): Observable<any>{
    return this.httpClient.delete<any>(this.url+"deleteCompany/"+id)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }
  
  public getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.url+'getAllCompanies') 
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public getOneCompany(id : number): Observable<any>{
    return this.httpClient.get<any>(this.url+"getOneCompany/"+id)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

   //Customers:
  
  public addCustomer(customer : Customer): Observable<any>{
    return this.httpClient.post<any>(this.url+"addCustomer", Customer)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public updateCustomer(customer : Customer): Observable<any>{
    return this.httpClient.put<any>(this.url+"updateCustomer", customer)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public deleteCustomer(id : number): Observable<any>{
    return this.httpClient.delete<any>(this.url+"deleteCustomer/"+id)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }
  
    
  public getAllCustomers(): Observable<any>{
    return this.httpClient.get<Customer[]>(this.url+'getAllCustomers')
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  public getOneCustomer(id : number): Observable<any>{
    return this.httpClient.get<any>(this.url+"getOneCustomer/"+id)
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  }

  //coupons:

  public getAllCoupons(): Observable<any>{
    return this.httpClient.get<Coupon[]>(this.url+'getAllCoupons')
    .pipe( catchError(err => this.errorService.errorHandler(err)));
  
  }
}

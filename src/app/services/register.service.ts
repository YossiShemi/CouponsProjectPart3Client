import { Env } from './../../environments/Env';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';
import {Customer} from '../models/Customer';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  
  private url =Env.URL+'register/';

  constructor(private httpClient: HttpClient,private errorService: ErrorHandlerService) { }

  public addCompany(company : Company): Observable<any>{
    return this.httpClient.post<any>(this.url+"company", company,{observe: 'response', withCredentials: true })
    .pipe( catchError(err => this.errorService.errorHandler(err)));

  }

  public addCustomer(customer : Customer): Observable<any>{
    return this.httpClient.post<any>(this.url+"customer", customer,{observe: 'response', withCredentials: true })
    .pipe( catchError(err => this.errorService.errorHandler(err)));

  }
}

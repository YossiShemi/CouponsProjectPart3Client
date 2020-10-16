import { Customer } from './../models/Customer';
import { Company } from './../models/Company';
import { Injectable, OnInit } from '@angular/core';
import { SecureService } from './secure.service';
import { CustomerService } from './customer.service';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService implements OnInit {

  public company:Company;
  public customer:Customer;

  constructor(
    private secureService: SecureService,
    private customerService: CustomerService,
    private companyService: CompanyService) { }

  ngOnInit(): void {

  }

  getCustomer=()=>{
    return this.customer;
  }

  getCompany=()=>{
    return this.company;
  }

  update=()=>{

    if(this.secureService.getIsLoggedIn){

      if(this.secureService.getService()==='company'){
        this.companyService.getCompanyDetails().subscribe(
          company=>{this.company=company},
          err=>{}
        );
      }

      if(this.secureService.getService()==='customer'){  
        this.customerService.getCustomerDetails().subscribe(
          customer=>{this.customer=customer},
          err=>{}
        );
      }
    }

  }

  }

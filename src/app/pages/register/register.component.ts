import { RegisterService } from './../../services/register.service';
import { Customer } from './../../models/Customer';
import { Company } from './../../models/Company';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  public type = new FormGroup({
    type: new FormControl(null, [
      Validators.required
    ])
  })

  public company = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl(null, [
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
  })

  public customer = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    first: new FormControl(null, [
      Validators.required,
    ]),
    last: new FormControl(null, [
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
  });

  public hide:boolean = true;
  
  constructor(
    private registerService:RegisterService
    ,private router:Router
    , private dialog: MatDialog,) { }

  ngOnInit(): void {
  }


  
  addCompany=()=>{
    const c= new Company(
      0,
      this.company.value.name,
      this.company.value.email,
      this.company.value.password,
      null
      );
      this.registerService.addCompany(c).subscribe(
        (res)=>{
          this.router.navigate(['/login']);
        },
        (err)=>{
          this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
        },
      );

  }

  addCustomer=()=>{
   
    const c= new Customer(
      0,
      this.customer.value.first,
      this.customer.value.last,
      this.customer.value.email,
      this.customer.value.password,
      null
    )    
      this.registerService.addCustomer(c).subscribe(
        (res)=>{
          this.router.navigate(['/login']);
        },
        (err)=>{
          this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
        },
      );

  }


}

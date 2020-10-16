import { ClientDetailsService } from './../../services/client-details.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCompanyDialogComponent } from '../add-company-dialog/add-company-dialog.component';
import { Customer } from 'src/app/models/Customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-update-customer-dialog',
  templateUrl: './update-customer-dialog.component.html',
  styleUrls: ['./update-customer-dialog.component.css']
})
export class UpdateCustomerDialogComponent implements OnInit {


  public hide:boolean = true;

  public customer = new FormGroup({
    id: new FormControl(this.data.id, [
      Validators.required,
    ]),
    email: new FormControl(this.data.email, [
      Validators.required,
      Validators.email,
    ]),
    first: new FormControl(this.data.first, [
      Validators.required,
    ]),
    last: new FormControl(this.data.last, [
      Validators.required,
    ]),
    password: new FormControl(this.data.password, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
  })

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private adminService:AdminServiceService ,
    private customerService:CustomerService,
    private clientDetailsService: ClientDetailsService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {      
  }

  ngOnInit(): void {
  }

  updateCustomer=()=>{
      const c  = new Customer(this.data.id,
      this.customer.value.first,
      this.customer.value.last,
      this.customer.value.email,
      this.customer.value.password,
      this.data.coupons
      );

     if (this.data.service === 'admin'){
      this.adminService.updateCustomer(c).subscribe(
        (res)=>{
          this.clientDetailsService.update();
          this.snackBar.open('Customer was updated successfully ! ','OK', {duration: 500}) ;
        },
        (err)=>{
          this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
        },
      );}

      if (this.data.service === 'customer'){
        this.customerService.updateCustomer(c).subscribe(
          (res)=>{
            this.clientDetailsService.update();
            this.snackBar.open('Customer was updated successfully ! ','OK', {duration: 500}) ;
          },
          (err)=>{
            this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
          },
        );
      }
  }


}

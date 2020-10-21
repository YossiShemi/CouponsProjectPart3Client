import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Customer } from 'src/app/models/Customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.css']
})
export class AddCustomerDialogComponent implements OnInit {

  
  public hide:boolean = true;
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

  constructor(
    private snackBar: MatSnackBar,
    private registerService:RegisterService ,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  addCustomer=()=>{

    const c= new Customer(
      0,
      this.customer.value.first,
      this.customer.value.last,
      this.customer.value.email,
      this.customer.value.password,
      null
      );
      this.registerService.addCustomer(c).subscribe(
        (res)=>{
          this.snackBar.open('Customer was added successfully ! ','OK', {duration: 500}) ;

        },
        (err)=>{
          this.dialog.open(ErrorDialogComponent,{ data: { err:err }});},
      );

  }

}

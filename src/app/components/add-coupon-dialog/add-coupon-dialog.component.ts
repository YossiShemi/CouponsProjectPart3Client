import { Component, OnInit } from '@angular/core';
import { Coupon, CouponType } from 'src/app/models/Coupon';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { MatDialog  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-coupon-dialog',
  templateUrl: './add-coupon-dialog.component.html',
  styleUrls: ['./add-coupon-dialog.component.css']
})
export class AddCouponDialogComponent implements OnInit {

  public c:Coupon;

  public couponsType: CouponType[] = [
    {value: 'Food'},
    {value: 'Electricity'},
    {value: 'Sport'},
    {value: 'Vacation'},
  ]

  public coupon = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
    ]),
    startDate: new FormControl(null, [
      Validators.required,
    ]),
    endDate: new FormControl(null, [
      Validators.required,
    ]),
    amount: new FormControl(null, [
      Validators.required,
    ]),
    couponType: new FormControl(null, [
      Validators.required,
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    price: new FormControl(null, [
      Validators.required,
    ]),
  })

  constructor(
    private snackBar: MatSnackBar,
    private companyService:CompanyService ,
    private dialog: MatDialog) {      
  }

  ngOnInit(): void {
  }

  addCoupon=()=>{
    
    this.c= new Coupon(0,0,
      this.coupon.value.title,
      this.coupon.value.startDate,
      this.coupon.value.endDate,
      this.coupon.value.amount,
      this.coupon.value.couponType,
      this.coupon.value.description,
      this.coupon.value.price);
    
      this.companyService.addCoupon(this.c).subscribe(
        (res)=>{
          this.snackBar.open('Coupon was added successfully ! ','OK', {duration: 500}) ;
        },
        (err)=>{
          this.dialog.open(ErrorDialogComponent,{ data: { err:err }});},
      );

  }

}

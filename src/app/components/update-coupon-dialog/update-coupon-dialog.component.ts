import { CompanyService } from './../../services/company.service';
import { Coupon, CouponType } from './../../models/Coupon';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-update-coupon-dialog',
  templateUrl: './update-coupon-dialog.component.html',
  styleUrls: ['./update-coupon-dialog.component.css']
})
export class UpdateCouponDialogComponent implements OnInit {

  public c:Coupon;

  public couponsType: CouponType[] = [
    {value: 'Food'},
    {value: 'Electricity'},
    {value: 'Sport'},
    {value: 'Vacation'},
  ]

  public coupon = new FormGroup({
    title: new FormControl(this.data.title, [
      Validators.required,
    ]),
    startDate: new FormControl(this.data.startDate, [
      Validators.required,
    ]),
    endDate: new FormControl(this.data.endDate, [
      Validators.required,
    ]),
    amount: new FormControl(this.data.amount, [
      Validators.required,
    ]),
    couponType: new FormControl(this.data.couponType, [
      Validators.required,
    ]),
    image: new FormControl(this.data.image, [
      Validators.required,
    ]),
    description: new FormControl(this.data.description, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    price: new FormControl(this.data.price, [
      Validators.required,
    ]),
  })

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private companyService:CompanyService ,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {      
  }

  ngOnInit(): void {
    this.companyService.getOneCoupon(this.data.id).subscribe(
      (res)=>this.c=res
      ,
      (err)=>{
      }
    );    
  }

  updateCompany=()=>{
  
    this.c.amount=this.coupon.value.amount;
    this.c.category=this.coupon.value.couponType;
    this.c.description=this.coupon.value.description;
    this.c.endDate=this.coupon.value.endDate;
    this.c.price=this.coupon.value.price;
    this.c.startDate=this.coupon.value.startDate;
    this.c.title=this.coupon.value.title;
      this.companyService.updateCoupon(this.c).subscribe(
        (res)=>{
          this.snackBar.open('Coupon was updated successfully ! ','OK', {duration: 500}) ;
        },
        (err)=>{
          this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
        },
      );

  }


}

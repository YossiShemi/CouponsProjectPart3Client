import { CustomerService } from './../../services/customer.service';
import { ClientDetailsService } from './../../services/client-details.service';
import { SecureService } from './../../services/secure.service';
import { Coupon } from 'src/app/models/Coupon';
import { CouponsService } from './../../services/coupons.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SureDialogComponent } from '../sure-dialog/sure-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-coupons-by-category',
  templateUrl: './coupons-by-category.component.html',
  styleUrls: ['./coupons-by-category.component.css']
})
export class CouponsByCategoryComponent implements OnInit {

  @Input()
  public category:string;
  public coupons:Coupon[]; // All coupons from category
  public coupons2:Coupon[];//Coupons to display
  public index:number=0; // current position to carousel
  public disableNext:boolean;
  public disablePrev:boolean;

  constructor(
    private customerService:CustomerService,
    private couponsService : CouponsService,
    public secureService: SecureService,
    public clientDetailsService: ClientDetailsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.coupons=[];
    this.coupons2=[];  
    
    this.couponsService.getAllCouponsByCategory(this.category).subscribe(
      coupons => {
        this.coupons = [...coupons];
        this.couponsToDisplay();
      },
      error => {});  
  }

  couponsToDisplay=()=>{
    for (let i = 0; i <4; i++) {;
      if(this.coupons[this.index+i] !== undefined){
        this.coupons2[i]=this.coupons[this.index+i];
      }

    }
  }

  next=()=>{    
    if(this.coupons[this.index+4] !== undefined){
    this.index+=1;
    if(this.disablePrev)
      this.disablePrev= !this.disablePrev;
    }
    else
     this.disableNext=true;

    this.couponsToDisplay()
  }

  prev=()=>{
    if(this.coupons[this.index-1] !== undefined){
      this.index-=1;
      if(this.disableNext)
      this.disableNext= !this.disableNext;
    }
    else
    this.disablePrev=true;

    this.couponsToDisplay()
  }
  
  purchaseCoupon=(coupon:Coupon)=>{
    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.customerService.purchaseCoupon(coupon).subscribe(
          res=>{
            this.couponsService.getAllCouponsByCategory(this.category).subscribe(
              coupons => {this.coupons = [...coupons]; 
              this.couponsToDisplay();
              },
              error => {});  
              this.snackBar.open('Coupon was purchased successfully ! ','OK', {duration: 500}) ;
              this.clientDetailsService.update();
           },
          err=>{
            this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
          } 
        );

      }
    });
  }



  
}

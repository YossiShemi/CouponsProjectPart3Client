import { Coupon } from './../../models/Coupon';
import { CouponsService } from './../../services/coupons.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/app/services/secure.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/components/dialogs/error-dialog/error-dialog.component';
import { SureDialogComponent } from 'src/app/components/dialogs/sure-dialog/sure-dialog.component';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {

  public coupon:Coupon;
  public id;

  constructor(private route:ActivatedRoute,
    public secureService: SecureService,
    private customerService:CustomerService,
    private couponsService : CouponsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { 
      this.coupon=new Coupon ();
    }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      }); 
      console.log(this.id);
         this.couponsService.getOneCoupon(this.id).subscribe(
             (res)=>{this.coupon=res},
             (err)=>{}
         );
    
  }

  purchaseCoupon=(coupon:Coupon)=>{
    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.customerService.purchaseCoupon(coupon).subscribe(
          res=>{
              this.snackBar.open('Coupon was purchased successfully ! ','OK', {duration: 500}) ;
           },
          err=>{
            this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
          } 
        );

      }
    });
  }

}

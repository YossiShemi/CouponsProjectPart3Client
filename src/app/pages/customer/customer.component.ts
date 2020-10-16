import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from 'src/app/models/Coupon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SureDialogComponent } from 'src/app/components/sure-dialog/sure-dialog.component';
import { ClientDetailsService } from 'src/app/services/client-details.service';
import { SecureService } from 'src/app/services/secure.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  //Attributes:

  public couponsColumns: string[] = ['id', 'title', 'startDate', 'endDate','amount','couponType','description','price','companyId','options'];
  public couponsSource: MatTableDataSource<Coupon>=null;
  public showSpinner:boolean=true;

  //CTOR+ lifecycle

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private secureService: SecureService, 
    private clientDetailsService: ClientDetailsService) { }

  ngOnInit(): void {

    this.secureService.update();
    this.clientDetailsService.update();
      this.customerService.getAllCoupons().subscribe(
        coupons =>{ this.couponsSource = new MatTableDataSource(coupons);  
        },
        error => {});  

        setTimeout(() => {
          this.showSpinner=false; 

        }, 1000);
  }

    // Filters for tables

    applyFilterCoupons(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.couponsSource.filter = filterValue.trim().toLowerCase();
    }

     // General

    deleteCouponPurchase=(item)=>{
    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.customerService.deleteCouponPurchase(item.id).subscribe(
          (res)=>{},
          (err)=>{}
        )
        this.couponsSource.data = this.couponsSource.data.filter(i => i !== item);
        this.snackBar.open('Coupon purchase was deleted successfully !','OK', {duration: 500}) ;
      }
    });
}

}

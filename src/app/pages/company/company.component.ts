import { AddCouponDialogComponent } from './../../components/add-coupon-dialog/add-coupon-dialog.component';
import { UpdateCouponDialogComponent } from './../../components/update-coupon-dialog/update-coupon-dialog.component';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Coupon } from 'src/app/models/Coupon';
import { SureDialogComponent } from 'src/app/components/sure-dialog/sure-dialog.component';
import { ClientDetailsService } from 'src/app/services/client-details.service';
import { SecureService } from 'src/app/services/secure.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  //Attributes:

  public couponsColumns: string[] = ['id', 'title', 'startDate', 'endDate','amount','couponType','description','image','price','companyId','options'];
  public couponsSource: MatTableDataSource<Coupon>=null;
  
  public showSpinner:boolean=true;

  
  //CTOR+ lifecycle
  
  constructor(
    private companyService:CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private secureService: SecureService, 
    private clientDetailsService: ClientDetailsService) { }

  ngOnInit(): void {
    
    this.secureService.update();
    this.clientDetailsService.update();
    
      this.companyService.getAllCoupons().subscribe(
        coupons => {this.couponsSource = new MatTableDataSource(coupons);},
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

  //General

  deleteCoupon=(item)=>{
    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.companyService.deleteCoupon(item.id).subscribe(
          (res)=>{},
          (err)=>{}
        )
        this.couponsSource.data = this.couponsSource.data.filter(i => i !== item);
        this.snackBar.open('Coupon was deleted successfully !','OK', {duration: 500}) ;
      }
    });
}

  updateCoupon=(item)=>{

      const dialogRef = this.dialog.open(UpdateCouponDialogComponent,
        { data: { id:item.id, title:item.title, startDate: item.startDate ,endDate: item.endDate,
          amount:item.amount,couponType:item.couponType,description:item.description, 
          price:item.price, image:item.image}});
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.companyService.getAllCoupons().subscribe(
              coupons => {this.couponsSource = new MatTableDataSource(coupons);},
              error => {});
          }

        });
      }

      addCoupon=()=>{
        const dialogRef = this.dialog.open(AddCouponDialogComponent,);
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.companyService.getAllCoupons().subscribe(
              coupons => {this.couponsSource = new MatTableDataSource(coupons);},
              error => {});
          }
    
        });
      }


}

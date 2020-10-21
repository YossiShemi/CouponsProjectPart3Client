import { UpdateCustomerDialogComponent } from './../../components/dialogs/update-customer-dialog/update-customer-dialog.component';
import { AddCustomerDialogComponent } from './../../components/dialogs/add-customer-dialog/add-customer-dialog.component';
import { UpdateCompanyDialogComponent } from './../../components/dialogs/update-company-dialog/update-company-dialog.component';
import { AddCompanyDialogComponent } from './../../components/dialogs/add-company-dialog/add-company-dialog.component';
import { SureDialogComponent } from './../../components/dialogs/sure-dialog/sure-dialog.component';
import { Company } from './../../models/Company';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AdminServiceService} from '../../services/admin-service.service';
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/Customer';
import { Coupon } from 'src/app/models/Coupon';
import { ClientDetailsService } from 'src/app/services/client-details.service';
import { SecureService } from 'src/app/services/secure.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  // Attributes: 

  public companyColumns: string[] = ['id', 'name', 'email', 'password','options'];
  public companySource: MatTableDataSource<Company>=null;
  public customerColumns: string[] = ['id', 'firstName','lastName', 'email', 'password','options'];
  public customerSource: MatTableDataSource<Customer>=null;
  public couponsColumns: string[] = ['id', 'title', 'startDate', 'endDate','amount','couponType','description','price','companyId'];
  public couponsSource: MatTableDataSource<Coupon>=null;

  public showSpinner:boolean=true;

  // CTOR+ lifecycle

  constructor(
    private adminService:AdminServiceService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,
     private secureService: SecureService, 
     private clientDetailsService: ClientDetailsService
      ) {}

    
  ngOnInit(): void {

    this.secureService.update();
    this.clientDetailsService.update();

      this.adminService.getAllCompanies().subscribe(
        companies => 
        {this.companySource = new MatTableDataSource(companies);},
        error => {});
      this.adminService.getAllCustomers().subscribe(
        customers => this.customerSource = new MatTableDataSource(customers),
        error => {});
      this.adminService.getAllCoupons().subscribe(
        coupons => this.couponsSource = new MatTableDataSource(coupons),
        error => {});  

        setTimeout(() => {
          this.showSpinner=false; 
        }, 500);
  }

  // Filters for tables

  applyFilterCompanies(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companySource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCustomers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCoupons(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.couponsSource.filter = filterValue.trim().toLowerCase();
  }

  //Companies functions

  deleteCompany=(item)=>{

    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.deleteCompany(item.id).subscribe(
          (res)=>{},
          (err)=>{}
        )
        this.companySource.data = this.companySource.data.filter(i => i !== item);
        this.snackBar.open('Company was deleted successfully !', 'OK', {duration: 500}) ;
      }
      }
    );
}

  addCompany=()=>{
    const dialogRef = this.dialog.open(AddCompanyDialogComponent,);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCompanies().subscribe(
          companies => this.companySource = new MatTableDataSource(companies),
          error => {console.log(error);
          });
      }

    });
  }

  updateCompany=(item)=>{
    const dialogRef = this.dialog.open(UpdateCompanyDialogComponent,
      { data: { service:'admin',id:item.id, name:item.name, email: item.email ,password: item.password, coupons:item.coupons }});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCompanies().subscribe(
          companies => this.companySource = new MatTableDataSource(companies),
          error => {});
      }

    });
  }


  //Customers functions

  deleteCustomer=(item)=>{

    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.adminService.deleteCustomer(item.id).subscribe(
          (res)=>{},
          (err)=>{}
        )
        this.customerSource.data = this.customerSource.data.filter(i => i !== item);
        this.snackBar.open('Customer was deleted successfully !', 'OK', {duration: 500}) ;
      }
    });
  }

  addCustomer=()=>{
    const dialogRef = this.dialog.open(AddCustomerDialogComponent,);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCustomers().subscribe(
          customers => this.customerSource = new MatTableDataSource(customers),
          error => {});
      }
    });
  }

  updateCustomer=(item)=>{
    const dialogRef = this.dialog.open(UpdateCustomerDialogComponent,
      { data: { service:'admin',id:item.id, first:item.firstName, last:item.lastName, email: item.email ,password: item.password }});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCustomers().subscribe(
          customers => this.customerSource = new MatTableDataSource(customers),
          error => {});
      }

    });
  }


}






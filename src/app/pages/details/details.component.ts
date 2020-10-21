import { UpdateCompanyDialogComponent } from './../../components/dialogs/update-company-dialog/update-company-dialog.component';
import { ClientDetailsService } from './../../services/client-details.service';
import { Customer } from 'src/app/models/Customer';
import { Company } from 'src/app/models/Company';
import { SecureService } from 'src/app/services/secure.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateCustomerDialogComponent } from 'src/app/components/dialogs/update-customer-dialog/update-customer-dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public company:Company;
  public customer:Customer;

  constructor(
     public  secureService:SecureService,
     private clientDetailsService: ClientDetailsService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,) 
     {
       
    this.secureService.update();
    this.clientDetailsService.update();
      }

  ngOnInit(): void {
console.log(this.secureService);

    if(this.secureService.getIsLoggedIn){
      if(this.secureService.getService()==='company'){
      this.company=this.clientDetailsService.company;
      }
      if(this.secureService.getService()==='customer'){
        this.customer=this.clientDetailsService.customer;
      }
    }
        
  }


  updateCustomer=()=>{
    const dialogRef = this.dialog.open(UpdateCustomerDialogComponent,
      { data: {service:'customer',
      id:this.customer.id, 
      first:this.customer.firstName,
      last:this.customer.lastName,
      email: this.customer.email ,
      password: this.customer.password,
      coupons: this.customer.coupons }});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.snackBar.open('Your details were updated successfully ! ','OK', {duration: 500}) ;
            this.customer=this.clientDetailsService.customer;
      }
    });
  }

  updateCompany=()=>{
    const dialogRef = this.dialog.open(UpdateCompanyDialogComponent,
      { data: { service:'company',
      id:this.company.id,
      name:this.company.name, 
      email: this.company.email ,
      password: this.company.password,
      coupons: this.company.coupons }});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.snackBar.open('Your details were updated successfully ! 😎','OK', {duration: 500}) ;
            this.company=this.clientDetailsService.company;
      }
    });
  }


}

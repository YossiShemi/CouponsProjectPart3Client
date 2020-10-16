import { CompanyService } from 'src/app/services/company.service';
import { AdminServiceService } from './../../services/admin-service.service';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/models/Company';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientDetailsService } from 'src/app/services/client-details.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-update-company-dialog',
  templateUrl: './update-company-dialog.component.html',
  styleUrls: ['./update-company-dialog.component.css']
})
export class UpdateCompanyDialogComponent implements OnInit {
  
  public hide:boolean = true;
  public company = new FormGroup({
    email: new FormControl(this.data.email, [
      Validators.required,
      Validators.email,
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
    private companyService: CompanyService,
    private clientDetailsService: ClientDetailsService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {      
  }

  ngOnInit(): void {
  }

  updateCompany=()=>{

    const c = new Company(
      this.data.id,
      this.data.name,
      this.company.value.email,
      this.company.value.password,
      this.data.coupons
      );

     if (this.data.service === 'admin'){
      this.adminService.updateCompany(c).subscribe(
        (res)=>{
          this.clientDetailsService.update();
          this.snackBar.open('Company was updated successfully ! ','OK', {duration: 500}) ;     
        },
        (err)=>{
          this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
        },
      );}

      if (this.data.service === 'company'){
        this.companyService.updateCompany(c).subscribe(
          (res)=>{
            this.clientDetailsService.update();
            this.snackBar.open('Company was updated successfully ! ','OK', {duration: 500}) ; 
          },
          (err)=>{
            this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
          },
        );}

  }

}

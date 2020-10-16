import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from 'src/app/models/Company';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.css']
})
export class AddCompanyDialogComponent implements OnInit {

  public hide:boolean = true;
  public company = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl(null, [
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
  })

  constructor(
    private snackBar: MatSnackBar,
    private registerService:RegisterService ,
    private dialog: MatDialog,) {
  }

  ngOnInit(): void {
  }

  addCompany=()=>{

    const c= new Company(
      0,
      this.company.value.name,
      this.company.value.email,
      this.company.value.password,
      null
      );
      this.registerService.addCompany(c).subscribe(
        (res)=>{
          this.snackBar.open('Company was added successfully ! ','OK', {duration: 500}) ;
        },
        (err)=>{
          this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
        },
      );

    
  }



}

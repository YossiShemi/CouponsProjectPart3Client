import { ErrorDialogComponent } from './../../components/dialogs/error-dialog/error-dialog.component';
import { ClientDetailsService } from './../../services/client-details.service';
import { CustomerService } from './../../services/customer.service';
import { CompanyService } from './../../services/company.service';
import { SecureService } from './../../services/secure.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AdminServiceService} from '../../services/admin-service.service'
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    clientType: new FormControl(null, [
      Validators.required
    ])
  });

  public hide:boolean = true;
  
  constructor(
    private adminService:AdminServiceService
    , private companyService:CompanyService
    , private customerService: CustomerService 
    , private router:Router
    , private secure: SecureService
    , private clientDetailsService: ClientDetailsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }



   login=()=>{
    const clientType= this.form.value.clientType;
    const email= this.form.value.email;
    const password= this.form.value.password;

    switch (clientType) {

      case 'admin':
        {
        this.adminService.login(email,password).subscribe(
          (res)=>{
            sessionStorage.setItem("Token",res.headers.get('Token'));
            sessionStorage.setItem("Service","admin");
            sessionStorage.setItem("LoggedIn","true");
            this.secure.update();
            this.clientDetailsService.update();
            this.router.navigate(['/homepage']);
          },
          (err)=>
          {
            this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
          },
        );
        break;
        }

        case 'company':
          {
          this.companyService.login(email,password).subscribe(
            (res)=>{
              sessionStorage.setItem("Token",res.headers.get('Token'));
              sessionStorage.setItem("Service","company");
              sessionStorage.setItem("LoggedIn","true");
              this.secure.update();
              this.clientDetailsService.update();
              this.router.navigate(['/homepage']);
            },
            (err)=> 
            {
              this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
            },
          );
            break;
          }

        case 'customer':
          {
          this.customerService.login(email,password).subscribe(
            (res)=>{
              sessionStorage.setItem("Token",res.headers.get('Token'));
              sessionStorage.setItem("Service","customer");
              sessionStorage.setItem("LoggedIn","true");
              this.secure.update();
              this.clientDetailsService.update();
              this.router.navigate(['/homepage']);
            },
            (err)=> {
              this.dialog.open(ErrorDialogComponent,{ data: { err:err }});
            },
          );
            break;
          }
    
      default:
        break;
    }
    
  }

}

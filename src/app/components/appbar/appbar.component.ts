import { ClientDetailsService } from './../../services/client-details.service';
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { SecureService } from 'src/app/services/secure.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'],  
})

export class AppbarComponent   {
  
  public name:string;
  public date= new Date();

  constructor(private router:Router, 
    public secureService: SecureService,
    public clientDetailsService: ClientDetailsService) {
      setInterval(() => {
        this.date = new Date();
      }, 1);
     }

  getName(): void {      
    setTimeout(()=>{
      if (this.secureService.getIsLoggedIn()){
        if(this.secureService.getService()=='company')
     this.name=  this.clientDetailsService.getCompany().name;
        else if (this.secureService.getService()==='customer')
        this.name= this.clientDetailsService.getCustomer().firstName +" "+this.clientDetailsService.getCustomer().lastName;
        else
        this.name= 'Admin';
      }
      else{
        return 'Guest';
      }
    }, 500);
  }

  getTitle=()=>{
    this.getName();
    return this.name;
  }

  logout=()=>{
    sessionStorage.setItem("Token","0");
    sessionStorage.setItem("Service","No");
    sessionStorage.setItem("LoggedIn"," false");
    this.secureService.update();
    this.clientDetailsService.update();
    this.router.navigate(['/homepage']);
  }


}

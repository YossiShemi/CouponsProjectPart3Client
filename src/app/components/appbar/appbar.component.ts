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
  

  constructor(private router:Router, 
    public secureService: SecureService,
    public clientDetailsService: ClientDetailsService) {
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

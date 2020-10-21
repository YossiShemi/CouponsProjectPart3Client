import { ClientDetailsService } from 'src/app/services/client-details.service';
import { SecureService } from 'src/app/services/secure.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public name:string;

  constructor(public secureService: SecureService,
    private clientDetailsService: ClientDetailsService,
) {

   }

  ngOnInit(): void {
    this.secureService.update();
    this.clientDetailsService.update();
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

 
}

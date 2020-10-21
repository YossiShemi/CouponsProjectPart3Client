import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router'
import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { CouponsService } from 'src/app/services/coupons.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  public category:string;
  public coupons:Coupon[];
  
  constructor(private route:ActivatedRoute,
    private router: Router,
    private couponsService : CouponsService) { 
      this.coupons=[];
      this.fetchdata();
    }

  ngOnInit(): void {

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.fetchdata();
    });
    
  
  }

  fetchdata =()=>{
    this.route.params.subscribe(params => {
      this.category = params['category'];
      });
      if (this.category==='all'){
        this.couponsService.getAllCoupons().subscribe(
          coupons => {
            this.coupons = [...coupons];
          },
          error => {}
        );
      }
      else{
      this.couponsService.getAllCouponsByCategory(this.category).subscribe(
        coupons => {
          this.coupons = [...coupons];
        },
        error => {}
        );  
      }
  }

}

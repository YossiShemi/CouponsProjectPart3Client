import { ClientDetailsService } from 'src/app/services/client-details.service';
import { SecureService } from 'src/app/services/secure.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private secureService: SecureService, private clientDetailsService: ClientDetailsService) { }

  ngOnInit(): void {
    this.secureService.update();
    this.clientDetailsService.update();
  }

}

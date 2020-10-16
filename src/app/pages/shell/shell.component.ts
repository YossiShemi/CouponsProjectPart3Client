import { Component, OnInit } from '@angular/core';
import { ClientDetailsService } from 'src/app/services/client-details.service';
import { SecureService } from 'src/app/services/secure.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private secureService: SecureService, private clientDetailsService: ClientDetailsService) { }

  ngOnInit(): void {
  }

}

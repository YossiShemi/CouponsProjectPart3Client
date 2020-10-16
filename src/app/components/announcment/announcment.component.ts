import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-announcment',
  templateUrl: './announcment.component.html',
  styleUrls: ['./announcment.component.css']
})
export class AnnouncmentComponent implements OnInit {

  @Input()
  public img1:string;
  @Input()
  public text1:string;

  @Input()
  public img2:string;
  @Input()
  public text2:string;

  @Input()
  public img3:string;
  @Input()
  public text3:string;

  constructor() { }

  ngOnInit(): void {
  }

}

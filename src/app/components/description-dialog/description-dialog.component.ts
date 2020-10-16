import { Inject, Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.css']
})
export class DescriptionDialogComponent implements OnInit {

  public desc:string;
  public title:string;

  constructor(
     @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
    this.desc=this.data.desc;
    this.title=this.data.title;
  }
}

import { Inject, Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  public msg:string;

  constructor(
     @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
    this.msg=this.data.err;
  }

}

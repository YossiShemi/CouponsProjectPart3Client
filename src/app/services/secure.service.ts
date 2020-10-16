import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecureService implements OnInit  {

  private isLoggedIn:boolean=false;
  private token:string=" ";
  private service:string=" ";

  constructor() { }

  ngOnInit(): void {
    this.isLoggedIn=sessionStorage.getItem('LoggedIn')==='true'? true:false;
    this.token=sessionStorage.getItem('Token');
    this.service=sessionStorage.getItem('Service');
  }
      
  getIsLoggedIn=()=>{
    return this.isLoggedIn;
  }

  setIsLoggedIn=(x:boolean)=>{
    this.isLoggedIn=x;
  }

  getToken=()=>{
    return this.token;
  }

  setToken=(x:string)=>{
    this.token=x;
  }

  getService=()=>{
    return this.service;
  }

  setService=(x:string)=>{
    this.service=x;
  }

  update=()=>{
    this.ngOnInit();
  }


  
}

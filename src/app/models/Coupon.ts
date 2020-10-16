export class Coupon {
    public constructor(
      public id?:number,
      public companyID ? : number,
      public title ? : string,
      public startDate ? : string,
      public endDate ? : string,
      public amount ? : number,
      public category ? : string,
      public description ? : string,
      public price ? : number,
      public image ? : number,
    ) {}
  }
  
  export interface CouponType {
    value: string;
  }
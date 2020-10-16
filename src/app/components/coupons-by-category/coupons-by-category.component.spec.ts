import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsByCategoryComponent } from './coupons-by-category.component';

describe('CouponsByCategoryComponent', () => {
  let component: CouponsByCategoryComponent;
  let fixture: ComponentFixture<CouponsByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCouponDialogComponent } from './update-coupon-dialog.component';

describe('UpdateCouponDialogComponent', () => {
  let component: UpdateCouponDialogComponent;
  let fixture: ComponentFixture<UpdateCouponDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCouponDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCouponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

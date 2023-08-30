import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidCardComponent } from './bid-card.component';

describe('BidCardComponent', () => {
  let component: BidCardComponent;
  let fixture: ComponentFixture<BidCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidCardComponent]
    });
    fixture = TestBed.createComponent(BidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

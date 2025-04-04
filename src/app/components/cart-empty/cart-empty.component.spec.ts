import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEmptyComponent } from './cart-empty.component';

describe('CartEmptyComponent', () => {
  let component: CartEmptyComponent;
  let fixture: ComponentFixture<CartEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartEmptyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

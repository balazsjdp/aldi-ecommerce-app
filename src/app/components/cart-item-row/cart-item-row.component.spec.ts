import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../store/cart/cart.selectors';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import CartItem from '../../shared/interfaces/cart-item.interface';
import { CartContentComponent } from '../cart-content/cart-content.component';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-cart-item-row',
  template: '<div>{{ item?.name }}</div>',
})
class MockCartItemRowComponent {
  @Input() item: unknown;
}

describe('CartContentComponent', () => {
  let component: CartContentComponent;
  let fixture: ComponentFixture<CartContentComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartContentComponent, MockCartItemRowComponent], // Move MockCartItemRowComponent to imports
      providers: [provideMockStore(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CartContentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cartItems with the value from selectCartItems', () => {
    const mockCartItems: CartItem[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        quantity: 2,
        img: '',
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        quantity: 1,
        img: '',
      },
    ];
    store.overrideSelector(selectCartItems, mockCartItems);
    fixture.detectChanges();

    expect(component.cartItems()).toEqual(mockCartItems);
  });

  it('should initialize cartSubTotal with the value from selectCartTotalPrice', () => {
    store.overrideSelector(selectCartTotalPrice, 500);
    fixture.detectChanges();

    expect(component.cartSubTotal()).toBe(500);
  });

  it('should render a CartItemRowComponent for each cart item', () => {
    const mockCartItems: CartItem[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        quantity: 2,
        img: '',
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        quantity: 1,
        img: '',
      },
    ];
    store.overrideSelector(selectCartItems, mockCartItems);
    fixture.detectChanges();

    const cartItemRows = fixture.debugElement.queryAll(
      By.css('app-cart-item-row')
    );
    expect(cartItemRows.length).toBe(mockCartItems.length);
  });

  it('should display the cart subtotal using HufPipe', () => {
    store.overrideSelector(selectCartTotalPrice, 500);
    fixture.detectChanges();

    const subtotalElement = fixture.debugElement.query(
      By.css('#cart-subtotal')
    ).nativeElement;
    expect(subtotalElement.textContent).toContain('5000 Ft'); // Assuming HufPipe appends 'Ft'
  });
});

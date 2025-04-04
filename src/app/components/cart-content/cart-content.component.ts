import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selectors';
import { CartItemRowComponent } from '../cart-item-row/cart-item-row.component';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-content',
  imports: [RouterModule,CartItemRowComponent, CurrencyPipe],
  template: `
          <div class="flow-root my-8">
          <ul role="list" class="-my-6 divide-y divide-gray-200">
            @for (item of cartItems(); track $index) {
              <app-cart-item-row [item]="item" />
            }
          </ul>
        </div>
        <div class="border-t border-gray-200 py-6">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{{cartSubTotal() | currency}}</p>
          </div>
          <p class="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div class="mt-6">
            <a
              href="#"
              class="flex items-center justify-center rounded-md border border-transparent bg-indigo-700 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-800"
              >Checkout</a
            >
          </div>
          <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <a
                routerLink="/products"
                class="font-medium text-indigo-700 hover:text-indigo-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </p>
          </div>
        </div>
  `
})
export class CartContentComponent {
  private _store = inject(Store);
  cartItems = this._store.selectSignal(selectCartItems);
  cartSubTotal = this._store.selectSignal(selectTotalPrice);
}

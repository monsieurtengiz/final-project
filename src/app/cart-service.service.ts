import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  currentCart = this.cart.asObservable();

  constructor() {}

  addToCart(product: any) {
    const currentCartItems = this.cart.getValue();
    const existingItem = currentCartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCartItems.push({ ...product, quantity: 1 });
    }

    this.cart.next(currentCartItems);
  }

  updateCart(updatedCartItems: any[]) {
    this.cart.next(updatedCartItems);
  }

  getCartItems() {
    return this.currentCart;
  }

  clearCart() {
    this.cart.next([]);
  }
}

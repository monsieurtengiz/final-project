import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]); // any ტიპი
  currentCart = this.cart.asObservable();

  constructor() {}

  addProductToCart(product: any) { // any ტიპი
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

  updateCart(updatedCartItems: any[]) { // any ტიპი
    this.cart.next(updatedCartItems);
  }

  // ირელევანტური ფუნქცია, არაა არსად გამოყენებული getCartItems()

  clearCart() {
    this.cart.next([]);
  }
}

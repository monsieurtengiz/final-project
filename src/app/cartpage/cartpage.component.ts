import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.scss'],
})
export class CartpageComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  checkoutMessage: string = '';
  isCheckoutPopupVisible: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.currentCart.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  increase(item: any) {
    if (item.quantity) {
      item.quantity = item.quantity + 1;
    } else {
      item.quantity = 1;
    }
    this.calculateTotalPrice();
  }

  dicrease(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
    this.calculateTotalPrice();
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
    this.cartService.updateCart(this.cartItems);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }

  checkoutButton() {
    this.checkoutMessage = 'Congratulations on your Purchase!';
    this.isCheckoutPopupVisible = true;
  }

  returnToHome() {
    this.isCheckoutPopupVisible = false;
    this.cartService.clearCart();
    this.router.navigate(['/app-homepage']);
  }
}

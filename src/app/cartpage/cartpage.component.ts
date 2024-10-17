import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.scss'],
})
export class CartpageComponent implements OnInit, OnDestroy {
  cartItemsSubscription!: Subscription;
  cartItems: any[] = []; // any ტიპი!
  totalPrice: number = 0;
  isCheckoutPopupVisible: boolean = false;
  // არასაჭირო ცვლადი checkoutMessage

  constructor(private cartService: CartService) {} // არ არის საჭირო როუტერ სერვისის ჩაინჯექთება კონსტრუქტორში, მარტივად შეგიძლია თემფლეითიდან routerLink="/app-homepage"

  ngOnInit() {
    // აკონტროლე subscription, unsubscribe-ის გარეშე დასაბსქრაიბებული იქნები (დატას წამოიღებ) მაშინაც, როცა ამ კომპონენტთან შეხება არ გაქვს, იდეალურ შემთხვევაში გამოიყენე async pipe
    this.cartItemsSubscription = this.cartService.currentCart.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalProductPrice();
    });
  }

  // increase რა? რა უნდა გაზარდოს ფუნქციამ?
  increaseProductQuantity(item: any) { // any ტიპი!
    if (item.quantity) {
      item.quantity = item.quantity + 1;
    } else {
      item.quantity = 1;
    }
    this.calculateTotalProductPrice();
  }

  // იგივე, ზედმეტად აბსტრაქტული ფუნქციის სახელი
  decreaseProductQuantity(item: any) { // any ტიპი
    if (item.quantity > 0) {
      item.quantity--;
    }
    this.calculateTotalProductPrice();
  }

  removeItemFromCart(item: any) { // any ტიპი
    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
    this.cartService.updateCart(this.cartItems);
    this.calculateTotalProductPrice();
  }

  calculateTotalProductPrice() {
    // არ იყო საჭირო chatgpt-ის და reduce ფუნქციის გამოყენება, შენითაც შეგეძლო დაგეწერა, მაგრამ თუ კარგად გესმის რა დაწერე არაა პრობლემა
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }

  // ფუნქციის სახელები შეარჩიე სწორად, ფუნქციის სახელი უნდა იყოს გრძელი და გამოხატავდეს თავის დანიშნულებას, ე.ი უნდა იყოს ზმნა და არა არასებითი სახელი
  handleCheckout() {
    this.isCheckoutPopupVisible = true;
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    // ყოველთვის მოხსენი subscription როდესაც კომპონენტიდან გადიხარ
    this.cartItemsSubscription.unsubscribe();
  }

  // არასაჭირო ფუნქცია clearCart()
}

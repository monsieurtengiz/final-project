import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart-service.service';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'final-project';
  cartItemCount$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // ბევრად უკეთესია ასეთ დროს async pipe-ის გამოყენება
    this.cartItemCount$ = this.cartService.currentCart.pipe(map((cartArray) => cartArray.length));
  }
}

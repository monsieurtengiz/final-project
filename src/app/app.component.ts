import { Component, OnInit } from '@angular/core';
import { CartService } from './cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'final-project';
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {

    this.cartService.currentCart.subscribe(items => {
      this.cartItemCount = items.length; 
    });
  }
}

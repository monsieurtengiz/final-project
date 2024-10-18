import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts!: any;
  isBannerActive: boolean = false; // boolean ტიპის ცვლადის სახელები ყოველთვის უნდა იწყებოდეს პრეფიქსი: is-ით
  // არ არის საჭირო მესიჯის ტექსტის ცვლადად შექმნა, ჩაწერე ტექსტი პირდაპირ თემფლეითში

  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get("https://api.escuelajs.co/api/v1/products").subscribe({
      next: (data: any) => { // (data: any??) ყოველთვის წერე ტიპები, Typescript-ის გამოყენება აზრს კარგავს, თუ ტიპები არ წერე 
        this.posts = data.splice(0, 40);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching data:', error);
      }

      // complete ფუნქციაში data-ს დაკონსოლება აღარაა საჭირო, თუ data მოვიდა, ისედაც გამოჩნდება homepage-ზე
    });
  }


  addProductToCart(item: any) { // any ტიპი
    this.cartService.addProductToCart(item);
    this.handlePopUpMessage()
  }

  handlePopUpMessage() {
    this.isBannerActive = true;
    setTimeout(() => {
      this.isBannerActive = false;
    }, 2000);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts!: any;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {   
    this.http.get("https://api.escuelajs.co/api/v1/products").subscribe({
      next: (data: any) => {
        this.posts = data;
        console.log(this.posts);
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching completed');
      }
    });
  }

  message:string = ""
  showMessage:boolean=false

  addToCart(item: any) {
    this.cartService.addToCart(item);
    this.popUpMessage()
  }

  popUpMessage(){
    this.message  = "Item Added To Cart";
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }
  

}

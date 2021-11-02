import {Component, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {Item} from "../dto/item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  total = 0;
  cartItems!: Array<{ item: Item, qty: number }>;

  constructor(private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadAllCartItems();
    this.calculateNetTotal();
  }

  loadAllCartItems() {
    this.cartItems = this.cartService.getAllCartItems();
  }

  navigateToItem(code: string) {
    this.router.navigate(['/items', code]);
  }

  calculateNetTotal(): void {
    this.total = this.cartService.getNetTotal();
  }
}

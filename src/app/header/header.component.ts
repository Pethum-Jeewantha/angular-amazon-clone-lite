import {Component, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  totalItemsInCart = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.onCartChange();
    this.cartService.restorePreviousState();
  }

  onCartChange() {
    this.cartService.updateTotalCartItems().subscribe(value => this.totalItemsInCart = value);
  }

}

import {Injectable} from '@angular/core';
import {Item} from "../dto/item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: Array<{ code: string, qty: number }> = [];
  totalItems: Subject<number> = new Subject<number>();

  constructor() {
  }

  updateCart(it: Item, toCart: number) {

    const item = this.cartItems.find(i => i.code === it.code);

    if (item) {
      item.qty = toCart;

      if (item.qty === 0) {
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
      }
    } else {
      this.cartItems.push({code: it.code, qty: toCart});
    }

    this.calculateTotalItems();
  }

  updateTotalCartItems(): Subject<number> {
    return this.totalItems;
  }

  private calculateTotalItems() {
    let totalItems = 0;
    this.cartItems.forEach(item => totalItems += item.qty);
    this.totalItems.next(totalItems);
  }

  getQtyInCart(code: string): number {
    const item = this.cartItems.find(item => item.code === code);

    return item ? item.qty : 0;
  }
}

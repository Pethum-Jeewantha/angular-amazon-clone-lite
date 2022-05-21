/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

import {Injectable} from '@angular/core';
import {Item} from "../dto/item";
import {Observable, Subject} from "rxjs";
import {OrderDetail} from "../dto/order-detail";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Array<{ item: Item, qty: number }> = [];
  private totalItems: Subject<number> = new Subject<number>();

  readonly ORDER_SERVICE_API = `${environment.baseAPI}/orders`;

  constructor(private http: HttpClient) {
  }

  updateCart(it: Item, toCart: number) {

    const item = this.cartItems.find(i => i.item.code === it.code);

    if (item) {
      item.qty = toCart;

      if (item.qty === 0) {
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
      }
    } else {
      this.cartItems.push({item: it, qty: toCart});
    }

    this.calculateTotalItems();
    localStorage.setItem('cart-details', JSON.stringify(this.cartItems));
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
    const item = this.cartItems.find(item => item.item.code === code);

    return item ? item.qty : 0;
  }

  getAllCartItems(): Array<{ item: Item, qty: number }> {
    return this.cartItems;
  }

  removeItemFromCart(code: string): void {
    this.cartItems = this.cartItems.filter(item => item.item.code !== code);
    this.calculateTotalItems();
    if (this.cartItems.length === 0) {
      localStorage.removeItem('cart-details');
    } else {
      localStorage.setItem('cart-details', JSON.stringify(this.cartItems));
    }
  }

  getNetTotal(): number {
    let total = 0;

    this.cartItems.forEach(item => {
      total += item.qty * item.item.price
    });

    return total;
  }

  placeCart(): Observable<void> {
    const orderDetails: Array<OrderDetail> = [];

    this.cartItems.forEach(ci => {
      orderDetails.push(new OrderDetail(ci.item.code, ci.qty, ci.item.price));
    });

    return this.http.post<void>(this.ORDER_SERVICE_API, orderDetails)
  }

  restorePreviousState(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart-details') ?? '[]');
    this.calculateTotalItems();
  }

  clearCart(): void {
    this.cartItems = [];
    this.calculateTotalItems();
    localStorage.removeItem('cart-details');
  }
}

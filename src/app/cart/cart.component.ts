/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

import {Component, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {Item} from "../dto/item";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  total = 0;
  cartItems!: Array<{ item: Item, qty: number }>;
  onProgress = false;

  constructor(private cartService: CartService,
              private router: Router,
              private toastrService: ToastrService) {
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

  checkout(): void {
    this.onProgress = true;
    this.cartService.placeCart().subscribe(value => {
      this.onProgress = false;
      this.toastrService.success("Order has been placed", "Success", {
        positionClass: 'toast-bottom-right',
      });
      this.cartService.clearCart();
      this.router.navigateByUrl('/home');
    }, error => {
      this.onProgress = false;
      this.toastrService.error("Failed to checkout. Try again!", "Error", {
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
      console.log(error);
    });
  }
}

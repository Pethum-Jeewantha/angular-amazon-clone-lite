/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../dto/item";
import {CartService} from "../service/cart.service";

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.scss']
})
export class CartRowComponent implements OnInit {

  @Input("item")
  item!: Item;
  @Input()
  qty: number = 0;
  @Output()
  onRemove = new EventEmitter<void>();

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  removeFromCart(code: string) {
    this.cartService.removeItemFromCart(code);
    this.onRemove.emit()
  }
}

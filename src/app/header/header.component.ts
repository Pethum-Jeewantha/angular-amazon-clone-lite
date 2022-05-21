/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

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

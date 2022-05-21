/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

import {Component, OnInit} from '@angular/core';
import {Item} from "../dto/item";
import {ItemService} from "../service/item.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: Array<Item> = [];
  onError = false;

  constructor(private itemService: ItemService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.loadAllItems();
  }

  loadAllItems() {
    this.onError = false;
    this.itemService.getAllItems().subscribe(value => {
      this.items = value
    }, error => {
      console.log(error);
      this.toastrService.error(error.message, "Failed to fetch Data", {
        positionClass: 'toast-center-center',
        progressBar: true
      }).onHidden.subscribe(value => this.onError = true);
    });
  }

  // items = DUMMY_DATA;
  // cartItems: Array<{ code: string, qty: number }> = [];


}

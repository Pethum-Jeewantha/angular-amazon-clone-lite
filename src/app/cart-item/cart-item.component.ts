import { Component, OnInit } from '@angular/core';
import {Item} from "../dto/item";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  item = new Item(
    'I001',
    'https://m.media-amazon.com/images/I/41S3MKU9TjL._AC_UL320_.jpg',
    'Apple Pencil (2nd Generation)',
    4,
    299,
    5
    )

  inCart = 0;

  constructor() { }

  ngOnInit(): void {
  }

  updateCart(increment: boolean) {
    increment ? this.inCart++ : this.inCart--;
  }
}

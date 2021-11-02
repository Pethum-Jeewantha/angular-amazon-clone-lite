import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item} from "../dto/item";
import {CartService} from "../service/cart.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.scss']
})
export class CartRowComponent implements OnInit, OnChanges {

  @Input("item")
  observableItem!: Observable<Item>;
  @Input()
  qty: number = 0;
  @Output()
  onRemove = new EventEmitter<void>();
  item!: Item

  constructor(private cartService: CartService) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.observableItem.subscribe(item => this.item = item)
  }

  ngOnInit(): void {
  }

  removeFromCart() {
    this.cartService.removeItemFromCart(this.item.code);
    this.onRemove.emit()
  }
}

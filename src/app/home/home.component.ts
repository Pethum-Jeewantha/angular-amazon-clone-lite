import {Component, OnInit} from '@angular/core';
import {Item} from "../dto/item";
import {ItemService} from "../service/item.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items!: Array<Item>;

  constructor(private itemService: ItemService) {
    this.items = itemService.getAllItems();
  }

  ngOnInit(): void {
  }

  // items = DUMMY_DATA;
  // cartItems: Array<{ code: string, qty: number }> = [];


}

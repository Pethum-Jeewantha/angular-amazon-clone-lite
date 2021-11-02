import {Component, OnInit} from '@angular/core';
import {Item} from "../dto/item";
import {ItemService} from "../service/item.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: Array<Item> = [];

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.loadAllItems();
  }

  loadAllItems() {
    this.itemService.getAllItems().subscribe(value => this.items = value, error => console.log(error));
  }

  // items = DUMMY_DATA;
  // cartItems: Array<{ code: string, qty: number }> = [];


}

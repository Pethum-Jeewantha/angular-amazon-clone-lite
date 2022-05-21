/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

import {Injectable} from '@angular/core';
import {Item} from "../dto/item";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly ITEM_SERVICE_API = `${environment.baseAPI}/items`;

  constructor(private http: HttpClient) {
  }

  getAllItems(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(this.ITEM_SERVICE_API).pipe(map(items => items.map(convertToItem)));
  }

  getItem(code: string): Observable<Item> {
    return this.http.get<Item>(`${this.ITEM_SERVICE_API}/${code}`).pipe(map(convertToItem));
  }
}

function convertToItem(item: any): Item {
  switch (item.rating as any) {
    case 2:
      item.rating = 2;
      break;
    case 3:
      item.rating = 3;
      break;
    case 4:
      item.rating = 4;
      break;
    case 5:
      item.rating = 5;
      break;
    default:
      item.rating = 1;
  }
  item.price = (item as any).unitPrice;
  item.code = (item as any)._id;
  return item;
}

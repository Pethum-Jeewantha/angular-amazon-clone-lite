/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

export class Item {

  constructor(public code: string,
              public image: string,
              public title: string,
              public rating: 1 | 2 | 3 | 4 | 5,
              public price: number,
              public qty: number,
              public description?: string
  ) {
  }
}

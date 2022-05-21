/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ItemComponent} from "./item/item.component";
import {CartComponent} from "./cart/cart.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'items/:code', //path variable
        component: ItemComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/main/home'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main/home'
  },
  {
    path: '**',
    redirectTo: '/main/home'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

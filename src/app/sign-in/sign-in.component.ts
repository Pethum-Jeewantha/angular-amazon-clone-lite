/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  needHelp = false;
  step2 = false;
  onProgress = false;

  auth = {
    userId: '',
    password: '',
  }

  constructor(private toastrService: ToastrService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.toastrService.clear();
  }

  onSubmit() {
    this.authService.auth(this.auth).subscribe((value) => {
      console.log(value)
      this.onProgress = false;
      this.toastrService.success("Login Successful", "Success", {
        positionClass: 'toast-bottom-right',
      });
    }, error => {
      this.onProgress = false;
      this.toastrService.error("Failed to login. Try again!", "Error", {
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
      console.error(error);
    });
  }
}

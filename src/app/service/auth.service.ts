/*
 * Copyright (c) 2022 - present Pethum Jeewantha. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 */

import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly AUTH_SERVICE_API = `${environment.baseAPI}/login`;

  constructor(private http: HttpClient) {
  }

  auth(auth: object): Observable<void> {
    return this.http.post<void>(this.AUTH_SERVICE_API, auth);
  }
}

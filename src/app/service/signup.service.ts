import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../dto/user";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  readonly SIGNUP_SERVICE_API = `${environment.baseAPI}/users`;

  constructor(private http: HttpClient) {
  }

  signupUser(user: User): Observable<void> {
    return this.http.post<void>(this.SIGNUP_SERVICE_API, user);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from '../models/model-urls';
import { User } from '../models/model-user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userREST: Urls

  constructor(private http: HttpClient) {
    this.userREST = new Urls({
      others: {
        login: "api/user/login"
      }
    });
  }

  public login(user: User): Observable<any> {
    return this.http.post(this.userREST.getHost() +
      this.userREST.others.login, user);
  }

}

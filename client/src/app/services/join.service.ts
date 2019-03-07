import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../models/model-urls';
import { Observable } from 'rxjs';
import { UserExt } from '../models/model-user-ext';


@Injectable({
  providedIn: 'root'
})
export class JoinService {

  private userREST: Urls;


  constructor(
    private http: HttpClient
  ) {
    this.userREST = new Urls({
      create: "api/user",
      others: {
        usIdValidated: "api/user/usIdValidated",
        usEmailValidated: "api/user/usEmailValidated",
        genEmailCode: "api/user/genEmailCode"
      }
    });
  }

  public validateUsId(usId: string): Observable<any> {
    return this.http.post(this.userREST.getHost() +
        this.userREST.others.usIdValidated, { usId: usId });
  }

  public validateUsEmail(usEmail: string): Observable<any> {
    return this.http.post(this.userREST.getHost() +
        this.userREST.others.usEmailValidated, { usEmail: usEmail });
  }

  public createUser(user: UserExt): Observable<any> {
    return this.http.post(this.userREST.create, user);
  }

  public genEmailCode(usEmail: string): Observable<any> {
    return this.http.post(this.userREST.getHost() +
        this.userREST.others.genEmailCode, { usEmail: usEmail });
  }
}

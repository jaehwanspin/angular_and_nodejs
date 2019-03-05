import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Urls } from '../models/model-urls';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private httpOption: any;
  private categoryREST: Urls;

  constructor(

    private http: HttpClient

  ) {
    this.categoryREST = new Urls({
      get: "api/category",
      getList: "api/category",
      post: "api/category",
      put: "api/category",
      delete: "api/category"
    })

    console.log(this.categoryREST.getList);

    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

  }

  public getCategoryList(): Observable<any> {
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFAAAAAAAAAAAAAAAAAAAAA");
    return this.http.get(this.categoryREST.getList);
  }
}

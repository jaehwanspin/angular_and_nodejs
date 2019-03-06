import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Urls } from '../models/model-urls';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private categoryREST: Urls;

  constructor(

    private http: HttpClient

  ) {
    this.categoryREST = new Urls({
      get: "api/category",
      getList: "api/category",
      create: "api/category",
      update: "api/category",
      delete: "api/category"
    });

  }

  public getCategoryList(): Observable<any> {
    return this.http.get(this.categoryREST.getList);
  }
}

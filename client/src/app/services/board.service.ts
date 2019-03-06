import { Injectable } from '@angular/core';
import { Urls } from '../models/model-urls';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardREST: Urls;

  constructor(

    private http: HttpClient

  ) {
    this.boardREST = new Urls({
      get: "api/board/",
      getList: "api/board/",
      create: "api/board/",
      update: "api/board/",
      delete: "api/board/"
    });
  }

  public getBoardList(query: any, catNo: number): Observable<any> {
    const httpParams = new HttpParams({
      fromObject: {
        "curPage": query.curPage,
        "perPage": query.perPage,
        "searchOpt": query.searchOpt,
        "keyword": query.keyword
      }
    });
    return this.http.get(this.boardREST.getList + catNo + "/", { params: httpParams });
  }
}

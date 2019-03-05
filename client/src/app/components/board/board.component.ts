import { Component, OnInit } from '@angular/core';

import { Pagination } from "../../utils/pagination";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private pagination: Pagination;

  constructor(

  ) {

  }

  ngOnInit() {
  }

}

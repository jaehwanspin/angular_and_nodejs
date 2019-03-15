import { Component, OnInit, OnChanges } from '@angular/core';

import { Pagination } from "../../utils/pagination";
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/model-board';
import { BoardService } from 'src/app/services/board.service';
import { Category } from 'src/app/models/model-category';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnChanges {

  private pagination: Pagination<Board>;
  private category: Category;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {
    this.pagination = new Pagination(1, 10, "", [ "t", "c", "u" ]);
    this.category = new Category();
    this.category.catNo = +this.route.snapshot.paramMap.get("catNo");
    this.getBoardList();
    this.getCatName();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.category.catNo = +this.route.snapshot.paramMap.get("catNo");
    this.getBoardList();
    this.getCatName();
    console.log(this.route.url);
  }

  public getCatName(): void {
    this.boardService.getCategory(this.category.catNo)
      .subscribe(
        category => {
          this.category = new Category(category);
        }
      )
  }

  public getBoardList(): void {
    this.boardService.getBoardList(this.pagination.getDataForSrch(), this.category.catNo)
      .subscribe(
        boardList => {
          boardList.forEach(board => {
            this.pagination.dataList.push(new Board(board));
          })
        }
      );
  }

}

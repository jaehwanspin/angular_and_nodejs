import { Component, OnInit } from '@angular/core';

import { Pagination } from "../../utils/pagination";
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/model-board';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private pagination: Pagination<Board>;
  private catNo: number;
  private catName: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {
    this.pagination = new Pagination(1, 10, "", [ "t", "c", "u" ]);
    this.catNo = +this.route.snapshot.paramMap.get("catNo");
    this.getBoardList();
  }

  ngOnInit() {
  }

  public getBoardList(): void {
    console.log(JSON.stringify(this.pagination.getDataForSrch()));
    this.boardService.getBoardList(this.pagination.getDataForSrch(), this.catNo)
      .subscribe(
        boardList => {
          console.log(JSON.stringify(boardList));
          boardList.forEach(board => {
            this.pagination.dataList.push(new Board(board));
          })
          this.catName = boardList[0].catName;
        }
      );
  }

}

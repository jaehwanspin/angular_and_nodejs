import { Component, OnInit, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Pagination } from "../../utils/pagination";
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from 'src/app/models/model-board';
import { BoardService } from 'src/app/services/board.service';
import { Category } from 'src/app/models/model-category';

import { AlertModalComponent } from "../alert-modal/alert-modal.component";
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnChanges {

  private pagination: Pagination<Board>;
  private category: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private modalService: NgbModal
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

  public writeBoard(): void {
    if (localStorage.getItem("signedUser")) {
      this.router.navigateByUrl(`/board/${this.category.catNo}/write`);
    } else {
      const modal = this.modalService.open(AlertModalComponent, {
        backdrop: "static", keyboard: false
      });
      modal.componentInstance.title = "게시판"
      modal.componentInstance.content = "로그인 후 이용해주세요"
      modal.componentInstance.nextPath = "/login";
    }
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

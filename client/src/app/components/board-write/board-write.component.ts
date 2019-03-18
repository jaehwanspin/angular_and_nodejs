import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { Category } from 'src/app/models/model-category';
import { BoardService } from 'src/app/services/board.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/model-board';

@Component({
  selector: 'app-board-write',
  templateUrl: './board-write.component.html',
  styleUrls: ['./board-write.component.css']
})
export class BoardWriteComponent implements OnInit, OnChanges {
  
  private content: string;

  private board: Board;
  private category: Category;
  private editorConfig: any;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute
  ) {
    this.board = new Board();
    this.setConfig();
    this.getCategory();
  }

  ngOnInit() {
    this.getCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCategory();
  }

  private setConfig(): void {
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: "100",
      width: "auto",
      imageEndpoint: ""
    };
  }

  public getCategory(): void {
    const catNo: number = +this.route.snapshot.paramMap.get("catNo");
    this.boardService.getCategory(catNo)
      .subscribe((category => {
        this.category = new Category(category);
      }));
  }

}

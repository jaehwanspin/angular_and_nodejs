import { Component, OnInit, OnChanges } from '@angular/core';

import { AppService } from "./services/app.service"
import { Category } from "./models/model-category";
import { User } from './models/model-user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlertModalComponent } from "./components/alert-modal/alert-modal.component"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  public categories: Category[];
  private user: User

  constructor(
    private appService: AppService,
    private modalService: NgbModal
  ) {
    this.user = null;
    this.categories = new Array();
  }

  ngOnInit() {
    this.getUser();
    this.getCategoriyList();
  }

  ngOnChanges() {
    this.getUser();
    this.getCategoriyList();
  }

  private getUser() {
    const usNo: number = parseInt(localStorage.getItem("signedUser"));

    console.log(localStorage.getItem("signedUser"));
    console.log(usNo);

    if (usNo != 0) {
      this.appService.getUser(usNo)
        .subscribe(user => {
          this.user = new User(user);
          console.log("user " + JSON.stringify(this.user));
        });
    }
  }

  private getCategoriyList() {
    this.appService.getCategoryList()
      .subscribe(
        categories => categories.forEach(category =>
            this.categories.push(new Category(category))
          )
        );
  }

  public logout() {
    localStorage.removeItem("signedUser");
    this.user = null;

    const modal = this.modalService.open(AlertModalComponent, {
      backdrop: "static", keyboard: false
    });
    modal.componentInstance.title = "로그아웃";
    modal.componentInstance.content = "로그아웃 되었습니다";
    modal.componentInstance.nextPath = "/";
  }
}

import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { LoginService } from 'src/app/services/login.service';
import { UserExt } from 'src/app/models/model-user-ext';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as jsSHA from "jssha";

import { AlertModalComponent } from "../alert-modal/alert-modal.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: UserExt;

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private location: Location
  ) {
    this.user = new UserExt({
      usId: "",
      usPass: ""
    });
  }

  ngOnInit(): void {
  }

  private validate(): number {
    var result = 0;

    if (this.user.usId.length == 0)
      result = 1;
    else if (this.user.usPass.length == 0)
      result = 2;

    return result;
  }

  public login(): void {
    const valid: number = this.validate();

    const modal = this.modalService.open(AlertModalComponent, {
      backdrop: "static", keyboard: false
    });
    modal.componentInstance.title = "로그인";

    if (valid == 1) {
      modal.componentInstance.content = "아이디를 입력하세요";
    } else if (valid == 2) {
      modal.componentInstance.content = "비밀번호를 입력하세요";
    } else {
      const sha = new jsSHA("SHA-256", "TEXT");
      sha.update(this.user.usPass);
      this.user.usPass = sha.getHash("HEX");

      this.loginService.login(this.user)
        .subscribe((result) => {
          if (result.login == true) {
            localStorage.setItem("signedUser", result.usNo);
            modal.componentInstance.content = "로그인 성공";
            modal.componentInstance.nextPath = "/";
            location.replace("/");
          } else {
            modal.componentInstance.content = "로그인 실패";
            modal.componentInstance.nextPath = "/login";
          }
        });
    }
  }

}

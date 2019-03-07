import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as jsSHA from "jssha";

import { UserExt } from 'src/app/models/model-user-ext';
import { JoinService } from 'src/app/services/join.service';

import { AlertModalComponent } from "../alert-modal/alert-modal.component";
import { EmailVerificationModalComponent } from "../email-verification-modal/email-verification-modal.component";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  private idValidated: boolean;
  private idInvalidMessage: string;
  private emailValidated: boolean;
  private emailInvalidMessage: string;
  private passValidated: boolean;
  private passInvalidMessage: string;

  private emailVerified: boolean;

  private user: UserExt;
  private usPass: string;
  private usPassConfirm: string;

  constructor(
    private modalService: NgbModal,
    private joinService: JoinService,
    private router: Router
  ) {
    this.user = new UserExt();
  }

  ngOnInit() {
    this.idValidated = false;
    this.idInvalidMessage = "";
    this.passValidated = false;
    this.passInvalidMessage = "";
    this.emailValidated = false;
    this.emailInvalidMessage = "";

    this.emailVerified = false;
  }

  public validateId(): void {
    this.joinService.validateUsId(this.user.usId)
      .subscribe((result) => {
        if (this.user.usId.length < 8) {
          this.idValidated = false;
          this.idInvalidMessage = "ID는 8자 이상으로 입력해주세요";
        } else if (!result.result) {
          this.idValidated = false;
          this.idInvalidMessage = "ID가 중복됩니다";
        } else {
          this.idValidated = true;
          this.idInvalidMessage = "";
        }
      });
  }

  public validateEmail(): void {
    this.emailVerified = false;
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.joinService.validateUsEmail(this.user.usEmail)
      .subscribe((result) => {
        if (!emailPattern.test(this.user.usEmail)) {
          this.emailValidated = false;
          this.emailInvalidMessage = "이메일주소 형식에 맞지 않습니다";
        } else if (!result.result) {
          this.emailValidated = false;
          this.emailInvalidMessage = "이메일주소가 중복됩니다";
        } else {
          this.emailValidated = true;
          this.emailInvalidMessage = "";
        }
      });
  }

  public validatePass(): void {
    const numPattern: RegExp = /[0-9]/;
    const engPattern: RegExp = /[a-zA-Z]/;
    const specPattern: RegExp = /[~!@\#$%<>^&*]/;

    if (this.usPass) {
      const sha = new jsSHA("SHA-256", "TEXT");
      sha.update(this.usPass);
      this.user.usPass = sha.getHash("HEX");
    }

    if (this.usPass && this.usPass.length < 8) {
      this.passValidated = false;
      this.passInvalidMessage = "패스워드는 8자 이상으로 입력해주세요";
    } else if (!(numPattern.test(this.usPass) &&
                  engPattern.test(this.usPass) &&
                  specPattern.test(this.usPass))) {
      this.passValidated = false;
      this.passInvalidMessage =
        "패스워드는 영문자 + 숫자 + 특수문자 조합으로 입력해주세요";
    } else if (this.usPassConfirm !== this.usPass) {
      this.passValidated = false;
      this.passInvalidMessage =
        "패스워드가 일치하지 않습니다";
    } else {
      this.passValidated = true;
      this.passInvalidMessage = "";
    }
  }

  public verifyUsEmail(): void {
    this.joinService.genEmailCode(this.user.usEmail)
      .subscribe((genedCode) => {
        const modal = this.modalService.open(EmailVerificationModalComponent,
          { backdrop: "static", keyboard: false });
        modal.componentInstance.genedCode = genedCode.code;

        modal.result.then((result) => {
          if (result == "success")
            this.emailVerified = true;
          else
            this.emailVerified = false;
        })
      });

  }

  public createUser(): void {
    const modal = this.modalService.open(AlertModalComponent,
      { backdrop: "static", keyboard: false });
    modal.componentInstance.title = "회원등록";
    modal.componentInstance.content = "성공";
    modal.componentInstance.nextPath = "/home";

    this.joinService.createUser(this.user)
      .subscribe((result) => {
        if (result.result) {
          this.router.navigateByUrl("/home");
        } else {
          console.log("등록 실패");
        }
      });

  }
}

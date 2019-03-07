import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlertModalComponent } from "../alert-modal/alert-modal.component";

@Component({
  selector: 'app-email-verification-modal',
  templateUrl: './email-verification-modal.component.html',
  styleUrls: ['./email-verification-modal.component.css']
})
export class EmailVerificationModalComponent implements OnInit {

  @Input() private genedCode: string;
  private code: string;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }

  public verify(): void {
    const modal = this.modalService.open(AlertModalComponent, {
      backdrop: "static", keyboard: false
    });
    modal.componentInstance.title = "이메일 인증";
    if (this.code == this.genedCode) {
      modal.componentInstance.content = "성공";
      this.activeModal.close("success");
    } else {
      modal.componentInstance.content = "실패";
      this.activeModal.close("failed");
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() title: string;
  @Input() Content: string;
  @Input() nextPath: string;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  public dismiss(): void {
    this.activeModal.dismiss('Cross click');
    if (this.nextPath) {
      this.router.navigateByUrl(this.nextPath);
    }
  }

  public close(e: Event): void {
    console.log(e);
    this.activeModal.close('Close click');
    if (this.nextPath) {
      this.router.navigateByUrl(this.nextPath);
    }
  }

}

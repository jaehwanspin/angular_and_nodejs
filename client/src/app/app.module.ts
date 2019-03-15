import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, COMPOSITION_BUFFER_MODE } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ClickOutsideModule } from "ng-click-outside";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { JoinComponent } from './components/join/join.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { EmailVerificationModalComponent } from './components/email-verification-modal/email-verification-modal.component';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    UserComponent,
    LoginComponent,
    JoinComponent,
    FooterComponent,
    HomeComponent,
    BoardDetailComponent,
    AlertModalComponent,
    EmailVerificationModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClickOutsideModule,
    AppRoutingModule
  ],
  providers: [
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    //{ provide: RouteReuseStrategy }
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    AlertModalComponent,
    EmailVerificationModalComponent
  ]
})
export class AppModule { }

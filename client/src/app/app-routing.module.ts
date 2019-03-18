import { NgModule } from '@angular/core';
import { RouterModule }  from "@angular/router";

import { AppComponent } from "../app/app.component";
import { LoginComponent } from "./components/login/login.component";
import { JoinComponent } from "./components/join/join.component";
import { UserComponent } from "./components/user/user.component";
import { BoardComponent } from "./components/board/board.component";
import { HomeComponent } from "./components/home/home.component";
import { BoardDetailComponent } from "./components/board-detail/board-detail.component";
import { BoardWriteComponent } from './components/board-write/board-write.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: "", redirectTo: "/home", pathMatch: "full"},
      { path: "home", component: HomeComponent },
      { path: "join", component: JoinComponent },
      { path: "login", component: LoginComponent },
      { path: "user/:usNo", component: UserComponent },
      { path: "board/:catNo", component: BoardComponent },
      { path: "board/detail/:boNo", component: BoardDetailComponent },
      { path: "board/:catNo/write", component: BoardWriteComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

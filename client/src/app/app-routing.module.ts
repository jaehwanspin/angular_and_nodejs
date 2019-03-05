import { NgModule } from '@angular/core';
import { RouterModule }  from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { JoinComponent } from "./components/join/join.component";
import { UserComponent } from "./components/user/user.component";
import { BoardComponent } from "./components/board/board.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: "", redirectTo: "/home", pathMatch: "full"},
      { path: "home", component: HomeComponent },
      { path: "join", component: JoinComponent },
      { path: "login", component: LoginComponent },
      { path: "user/:usNo", component: UserComponent },
      { path: "board/:boNo", component: BoardComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

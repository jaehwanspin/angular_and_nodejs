import { Component } from '@angular/core';

import { AppService } from "./services/app.service"
import { Category } from "./models/model-category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public categories: Category[];

  constructor(
    private menuService: AppService
  ) {
    this.categories = new Array();
    this.getCategoriyList();
  }

  ngOnInit() {
  }

  private getCategoriyList() {
    this.menuService.getCategoryList()
      .subscribe(
        categories => categories.forEach(category =>
            this.categories.push(new Category(category))
          )
        );
  }
}

export class Category {

  public catNo: number;
  public catName: string;

  public constructor(model?: any) {
    if (model) {
      this.catNo = model.catNo;
      this.catName = model.catName;
    }
  }
}

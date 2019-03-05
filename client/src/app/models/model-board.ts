export class Board {

  public boNo: number;
  public catNo: number;
  public catName: string;
  public boTitle: string;
  public boContent: string;
  public readCount: string;
  public recomCount: string;
  public usNo: number;
  public usId: string;
  public usEmail: string;
  public usName: string;
  public regDate: string;
  public modDate: string;

  public constructor(model?: any) {
    if (model) {
      this.boNo = model.boNo;
      this.catNo = model.catNo;
      this.catName = model.catName;
      this.boTitle = model.boTitle;
      this.boContent = model.boContent;
      this.readCount = model.readCount;
      this.recomCount = model.recomCount;
      this.usNo = model.usNo;
      this.usId = model.usId;
      this.usEmail = model.usEmail;
      this.usName = model.usName;
      this.regDate = model.regDate;
      this.modDate = model.modDate;
    }
  }
}

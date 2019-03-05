export class Comment {

  public comNo: number;
  public boNo: number;
  public comContent: string;
  public usNo: number;
  public usId: string;
  public usEmail: string;
  public usName: string;
  public regDate: string;
  public modDate: string;

  public constructor(model?: any) {
    if (model) {
      this.comNo = model.comNo;
      this.boNo = model.boNo;
      this.comContent = model.comContent;
      this.usNo = model.usNo;
      this.usId = model.usId;
      this.usEmail = model.usEmail;
      this.usName = model.usName;
      this.regDate = model.regDate;
      this.modDate = model.modDate;
    }
  }

}

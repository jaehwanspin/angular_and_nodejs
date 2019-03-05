export class User {

  public usNo: number;
  public usId: string;
  public usEmail: string;
  public usName: string;
  public regDate: string;
  public modDate: string;

  public constructor(model?: any) {
    if (model) {
      this.usNo = model.usNo;
      this.usId = model.usId;
      this.usEmail = model.usEmail;
      this.usName = model.usName;
      this.regDate = model.regDate;
      this.modDate = model.modDate;
    }
  }
}

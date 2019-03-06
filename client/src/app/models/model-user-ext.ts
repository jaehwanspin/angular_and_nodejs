import { User } from "./model-user";

export class UserExt extends User {
  public usPass: string;

  public constructor(model?: any) {
    super(model ? model : null);
    if (model) {
      this.usPass = model.password;
    }
  }
}

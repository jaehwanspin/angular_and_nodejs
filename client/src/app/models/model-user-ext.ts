import { User } from "./model-user";

export class UserExt extends User {
  public password: string;
  public passwordHash: string;

  public constructor(model?: any) {
    super(model ? model: null);
    if (model) {
      this.password = model.password;
      this.passwordHash = model.passwordHash;
    }
  }
}

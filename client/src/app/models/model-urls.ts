export class Urls {
  public get: string;
  public getList: string;
  public create: string;
  public update: string;
  public delete: string;

  constructor(model?: any) {
    var url: string = null;

    console.log(JSON.stringify(model));

    if (model) {
      const host: string = "localhost";
      const port: string = "8888";
      url = "http://" + host + ":" + port + "/"

      this.get = url + model.get;
      this.getList = url + model.getList;
      this.create = url + model.create;
      this.update = url + model.update;
      this.delete = url + model.delete;

      console.log(JSON.stringify(this));
    }
  }
}

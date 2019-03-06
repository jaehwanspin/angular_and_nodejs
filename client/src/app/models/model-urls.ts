export class Urls {

  private host: string;
  private port: string;

  public get: string;
  public getList: string;
  public create: string;
  public update: string;
  public delete: string;
  public others: any;

  constructor(model?: {
                        get?: string,
                        getList?: string,
                        create?: string,
                        update?: string,
                        delete?: string,
                        others?: Object
                      }
                        ) {
    var url: string = null;

    if (model) {
      this.host = "localhost";
      this.port = "8888";
      url = "http://" + this.host + ":" + this.port + "/";

      this.get = url + model.get;
      this.getList = url + model.getList;
      this.create = url + model.create;
      this.update = url + model.update;
      this.delete = url + model.delete;

      this.others = model.others;
    }
  }

  public getHost(): string {
    return "http://" + this.host + ":" + this.port + "/";
  }
}

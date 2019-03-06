export class Pagination <T> {

  private perPage: number;
  private numOfRows: number;
  private keyword: string;
  private searchOpt: string;
  private searchOptList: string[];
  private curPage: number;

  public dataList: T[];

  constructor(curPage: number = 1, perPage: number = 10,
    keyword: string = "", searchOptList?: string[]) {

    this.dataList = new Array<T>();
    this.curPage = curPage;
    this.perPage = perPage;
    this.keyword = keyword;
    this.searchOptList = searchOptList;
    this.searchOpt = searchOptList[0];
  }

  public setRowOpt(rowOpt: number): void {
    this.perPage = rowOpt;
  }
  public setKeyword(keyword: string) {
    this.keyword = keyword;
  }
  public setCurPage(curPage: number): void {
    this.curPage = curPage;
    if (this.curPage > this.getNumOfPages())
      this.curPage = this.getNumOfPages();
    else if (this.curPage < 1)
      this.curPage = 1;
  }
  public setSearchOpt(searchOpt: string): void {
    this.searchOpt = searchOpt;
  }
  public setNumOfRows(numOfRows: number): void {
    this.numOfRows = numOfRows;

    console.log(this.getNumOfPages);
  }

  public getNumOfPages(): number {
    return Math.ceil(this.numOfRows / this.perPage);
  }

  public getFirstPage(): number {
    return (Math.floor(this.curPage / 10) * 10) + 1;
  }
  public getLastPage(): number {
    return Math.min((this.getFirstPage() - 1) + this.getNumOfPages(),
      (this.getFirstPage() - 1) + this.perPage);
  }

  public createPages(): number[] {
    var pages: number[] = [];
    for (var i: number = this.getFirstPage(); i <= this.getLastPage(); i++) {
      pages.push(i);
    }

    return pages;
  }

  public getDataForSrch(): any {
    return {
      perPage: this.perPage,
      curPage: (this.curPage - 1) * this.perPage,
      keyword: this.keyword,
      searchOpt: this.searchOpt
    };
  }
}

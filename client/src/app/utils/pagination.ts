export class Pagination {

  private perPage: number;
  private numOfRows: number;
  private keyword: string;
  private searchOpt: string;
  private curPage: number;

  public dataList: any[];

  constructor(curPage: number = 1, rowOpt: number = 6,
    keyword: string = "", srchOpt: string = "") {
    this.curPage = curPage;
    this.perPage = rowOpt;
    this.keyword = keyword;
    this.searchOpt = srchOpt;
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
  public setSrchOpt(srchOpt: string): void {
    console.log(srchOpt);
    this.searchOpt = srchOpt;
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
    }
  }
}

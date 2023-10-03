
export default class CodesModel{
  id: number;
  product: string;
  code: number;
  date: string;

  constructor(id:number, product: string, code: number, date:string){
    this.id = id;
    this.product=product;
    this.code=code;
    this.date=date;
  }
}

export default class ConnectorsModel{
  id: number;
  product: string;
  date: string;
  costumerDraw: string;
  revision:string;
  costumerDraw2:string;
  connector:string;
  sa:string;
  sa2:string;
  constructor(
    id:number,
    product: string,
    date:string,
    costumerDraw: string,
    revision:string,
    costumerDraw2:string,
    connector:string,
    sa:string,
    sa2:string
      ){
    this.id = id;
    this.product=product;
    this.date=date;
    this.costumerDraw=costumerDraw;
    this.revision=revision;
    this.costumerDraw2=costumerDraw2;
    this.connector=connector;
    this.sa=sa;
    this.sa2=sa2;
  }
}
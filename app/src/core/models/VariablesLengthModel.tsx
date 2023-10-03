export default class VariablesLengthModel{
  id: number;
  product: string;
  date: string;
  x4: string;
  var_: string;
  constructor( id: number, product: string, date: string,   x4: string, var_: string ){
    this.id = id;
    this.product = product;
    this.date = date;
    this.x4 = x4;
    this.var_ = var_;
  }
}
export default class PinsModel{
  id: number;
  jigboard: string;
  date: string;
  locationCart: string;
  point: string;
  templatePos: string;
  condition: string;
  sa: string;
constructor(id: number,jigboard: string,date: string,locationCart: string, point:string, templatePos:string,condition:string, sa:string){
this.id = id;
this.jigboard = jigboard;
this.date = date;
this.locationCart = locationCart;
this.point = point;
this.templatePos = templatePos;
this.condition = condition;
this.sa = sa;
}
}
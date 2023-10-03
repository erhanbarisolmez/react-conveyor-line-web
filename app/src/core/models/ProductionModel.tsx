export default class ProductionModel{
  id: number;
  product: string;
  date: string;
  jigboardPLS: string;
  jigboardType: string;
  fixedString: string;
  liveString: string;
  work: string;
  dateFinished: string;
  orderNumber: string;
  constructor(
    id: number, 
    product: string,
    date: string,
    jigboardPLS: string,
    jigboardType: string,
    fixedString: string,
    liveString: string,
    work: string,
    dateFinished: string,
    orderNumber: string
    ){
     this.id = id;
     this.product = product;
     this.date = date ;
     this.jigboardPLS = jigboardPLS;
     this.jigboardType = jigboardType;
     this.fixedString = fixedString;
     this.liveString = liveString;
     this.work = work;
     this.dateFinished = dateFinished;
     this.orderNumber = orderNumber;     
    }
  }
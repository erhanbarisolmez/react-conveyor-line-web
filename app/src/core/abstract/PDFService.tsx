abstract class PDFServiceBase {
  abstract downloadPDF(data: any[], fileName:string, headers: string[]) : void;
}
export default PDFServiceBase;
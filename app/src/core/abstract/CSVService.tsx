abstract class CSVServiceBase {
  abstract downloadCSV(data: any[], fileName:string, headers: string[]) : void;
}
export default CSVServiceBase;
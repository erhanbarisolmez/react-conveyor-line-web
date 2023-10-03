import CSVServiceBase from "../abstract/CSVService";

class CSVService extends CSVServiceBase{
  downloadCSV(data: any[], fileName: string, headers: string[]): void {
    const csvData = data.map((item) => {
      const row = headers.map((header) => {
        if (typeof item[header] === 'string') {
          return `"${item[header]}"`;
        } else if (typeof item[header] === 'bigint' || typeof item[header] === 'number') {
          return item[header].toString();
        }
        return item[header];
      });
      return row.join(',');
    });

  const headerRow = headers.join(',');
  const csvContent = [headerRow].concat(csvData).join('\n');

  const blob = new Blob([csvContent], {type:'text/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;

  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles:true,
    cancelable:false,
    });
    a.dispatchEvent(clickEvent);

    window.URL.revokeObjectURL(url);
  }
  }
 
export default CSVService;
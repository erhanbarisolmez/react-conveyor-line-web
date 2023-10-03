import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import PDFServiceBase from "../abstract/PDFService";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class PDFService extends PDFServiceBase{
  downloadPDF(data: any[], fileName: string , headers: any[]) {
    
    const modelName = fileName.split('.')[0];
    const documentDefinition = {
      content: [
        {
          text: `${modelName} Report`,
          style: 'header',
        },
        {
          table: {
            headers,
            body: data.map((item) => headers.map((header) => item[header])),
          },
          layout: 'lightHorizontalLines',
        },
      ],
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download(fileName);
  }
}

export default PDFService;

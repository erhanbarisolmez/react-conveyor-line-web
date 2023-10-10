import CodesIcon from '@mui/icons-material/DocumentScannerOutlined';
import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useMemo, useState } from "react";
import ActionButton from '~/src/components/ActionButton';
import AutocompleteSearch from '~/src/components/AutoCompleteSearch';
import { ContentTitle } from '~/src/components/ContentTitle';
import CustomDataGrid from "~/src/components/CustomDataGrid";
import type CodesModel from "~/src/core/models/CodesModel";
import ServiceManager from '~/src/core/services/ServiceManager';

export const loader = async() => {
  const codesService = ServiceManager.getCodesService();
  const codes = await codesService.getAll();
  return codes;
}

export default function CodesContent() {
  const codesService = useMemo(() => ServiceManager.getCodesService(), []);
  const [codes, setCodes] = useState<CodesModel[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "product", headerName: "Product", width: 300 },
    { field: "code", headerName: "Code", width: 300 },
    { field: "date", headerName: "Date", width: 300 },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      async function getCodes() {
        const codes = await codesService.getAll();
        setCodes(codes);

        // product datası
        const productNames = codes.map((code) => code.product);
        setProducts(productNames);

      }
      getCodes();
    }
  }, [codesService]);

  /* Abstract Class - CSVService */
  const downloadCSVFunction = (data : CodesModel[]) =>{
    const headers = columns.map((column) => column.field);
    const fileName = "Codes.csv";
    const csvService = ServiceManager.getCSVGenerateService();
    csvService.downloadCSV(codes, fileName, headers);
  }
  /* Abstract Class - PDFService */
  const downloadPDFFunction = (data: CodesModel[]) => {
    const headers = columns.map((column) => column.field);
    const fileName = "Codes.pdf";
    const pdfService = ServiceManager.getPDFGenerateService();
    pdfService.downloadPDF(codes, fileName, headers);
  }
  /* Abstract Class - DeleteAllService */
  function deleteAllFunction(data: CodesModel[]): void {
    const apiUrl = 'http://localhost:3001/codes/deleteAllCodes';
    const codesDeleteAllService = ServiceManager.getDeleteAllGenerateService(apiUrl);
    codesDeleteAllService.deleteAll(codes, apiUrl);
    setCodes([]);
    setProducts([]);
  }
  
  /* Interface - CodesService */
  const handleDeleteClick = async (id: number):Promise <void> => {
    try {
      await codesService.delete(id);
      const updatedCodes = codes.filter((code) => code.id  !== id);
      setCodes(updatedCodes);
       // Silinen değeri Product Search kaldırma
       const deleteCode = codes.find((code) => code.id === id);
         if (deleteCode) {
          const updateProducts = products.filter((productName) => productName !== deleteCode.product);
          setProducts(updateProducts);
       }
    } catch (error) {
      const errorMessage = (error as Error)?.message || error?.toString();
      console.error("Silme işlemi başarısız", errorMessage);
    }
  }

  return (
    <>
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width:'90vw',
        height:'90vh'
      }}
    >
    {/* Component */}
    <ContentTitle 
      icon={CodesIcon} 
      title='Codes'
    />

    {/* Component */}
       <Box sx={{
      mt:3
    }}>
    <AutocompleteSearch 
      label='Product Search'
      data={products}
      width='200px'
      selected={selected}
      onDataSelect={setSelected}
    />
    </Box>

    {/* Component */}
    <ActionButton 
          titleDownloadCSV="Download CSV"
          titleDownloadPDF='Download PDF'
          titleDeleteAll='Delete All' 
          data={codes}    
          downloadCSV={downloadCSVFunction}
          downloadPDF={downloadPDFFunction}
          deleteAll={deleteAllFunction}
    />
      

      <Grid container spacing={2}>
        <Box
          sx={{
          width:'100vw',
          p:20,
          pt:0
          }}
        >
          <CustomDataGrid
           columns={columns} 
           data={codes}
           selectedData={selected}
           onDeleteClick={handleDeleteClick}  
           filterColumn="product"
           showAddColumn={false}
           />
        </Box>
      </Grid>
      </Box>

</>
  );
}

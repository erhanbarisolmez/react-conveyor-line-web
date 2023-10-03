import ConnectorsIcon from '@mui/icons-material/SettingsInputCompositeOutlined';
import { Box, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ActionButton from "~/src/components/ActionButton";
import AutocompleteSearch from "~/src/components/AutoCompleteSearch";
import { ContentTitle } from "~/src/components/ContentTitle";
import CustomDataGrid from "~/src/components/CustomDataGrid";
import type ConnectorsModel from "~/src/core/models/ConnectorsModel";
import ServiceManager from "~/src/core/services/ServiceManager";

export const loader = async() => {
  const connectorsService = ServiceManager.getConnectorsService();
  const connectors = await connectorsService.getAll();
  return connectors;
}

export default function ConnectorsContent() {
  const connectorsService = useMemo(() => ServiceManager.getConnectorsService(), []);
  const [connectors, setConnectors] = useState<ConnectorsModel[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "product", headerName: "Product", width: 300 },
    { field: "costumerDraw", headerName: "Costumer Draw", width: 300 },
    { field: "revision", headerName: "Revision", width: 300 },
    { field: "costumerDraw2", headerName: "Costumer Draw 2", width: 300 },
    { field: "connector", headerName: "Connector", width: 300 },
    { field: "date", headerName: "Date", width: 300 },
    { field: "sa", headerName: "Sa", width: 300 },
    { field: "sa2", headerName: "Sa2", width: 300 }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      async function getConnectors() {
        const connectors = await connectorsService.getAll();
        setConnectors(connectors);

        // product datası
        const productNames = connectors.map((connector) => connector.product);
        setProducts(productNames);
      }
      getConnectors();
    }
  }, [connectorsService]);

  /* Abstract Class - CSVService */
  const downloadCSVFunction = (data : ConnectorsModel[]) =>{
    const headers = columns.map((column) => column.field);
    const fileName = "Connectors.csv";
    const csvService =  ServiceManager.getCSVGenerateService();
    csvService.downloadCSV(connectors, fileName, headers);
  }
  /* Abstract Class - PDFService */
  const downloadPDFFunction = (data: ConnectorsModel[]) => {
    const headers = columns.map((column) => column.field);
    const fileName = "Connectors.pdf";
    const pdfService = ServiceManager.getPDFGenerateService();
    pdfService.downloadPDF(connectors, fileName, headers);
  }
  /* Abstract Class - DeleteAllService */
  function deleteAllFunction(data: ConnectorsModel[]): void {
    const apiUrl = 'http://localhost:3001/connectors/deleteAllConnectors';
    const codesDeleteAllService = ServiceManager.getDeleteAllGenerateService(apiUrl);
    codesDeleteAllService.deleteAll(connectors, apiUrl);
    setConnectors([]);
    setProducts([]);
  }
  
  /* Interface - ConnectorsService */
  const handleDeleteClick = async (id: number):Promise <void> => {
    try {
      await connectorsService.delete(id);
      const updatedConnectors = connectors.filter((connector) => connector.id  !== id);
      setConnectors(updatedConnectors);

      // Silinen değeri Product Search kaldırma
      const deleteConnector = connectors.find((connector) => connector.id === id);
      if (deleteConnector) {
        const updateProducts = products.filter((productName) => productName !== deleteConnector.product);
        setProducts(updateProducts);
      }
    } catch (error) {
      const errorMessage = (error as Error)?.message || error?.toString();
      console.error("Silme işlemi başarısız", errorMessage);
    }
  };

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
        height:'90vh',
      }}
    >
    {/* Component */}
    <ContentTitle 
      icon={ConnectorsIcon} 
      title='Connectors'
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
          data={connectors}    
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
          {/* Table Component */}
          <CustomDataGrid
           columns={columns} 
           data={connectors}
           selectedData={selected}
           onDeleteClick={handleDeleteClick}  
           filterColumn='product'
           />
        </Box>
      </Grid>
      </Box>

</>
  );
}

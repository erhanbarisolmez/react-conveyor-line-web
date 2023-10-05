import ProductionReportIcon from '@mui/icons-material/AssessmentOutlined';
import { Box, Grid } from "@mui/material";
import type { DateRange } from '@mui/x-date-pickers-pro';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from "react";
import ActionButton from '~/src/components/ActionButton';
import AutocompleteSearch from '~/src/components/AutoCompleteSearch';
import { ContentTitle } from "~/src/components/ContentTitle";
import CustomDataGrid from '~/src/components/CustomDataGrid';
import CustomDatePickers from '~/src/components/CustomDatePickers';
import type ProductionModel from "~/src/core/models/ProductionModel";
import ServiceManager from "~/src/core/services/ServiceManager";
interface ProductionReportContentProps{
  
}
export default function ProductionReportContent(props: ProductionReportContentProps) {
  const productionService = useMemo(() => ServiceManager.getProductionService(),[]);
  const [productions, setProductions] = useState<ProductionModel[]>([]);
  const [work, setWork] = useState<string[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange<Dayjs>>([
    dayjs('2000-01-01T15:30'),
    dayjs('2023-04-21T18:30'),
  ]);
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "product", headerName: "Product", width: 300 },
    { field: "orderNumber", headerName: "Order Number", width: 300 },
    { field: "jigboardPLS", headerName: "Jigboard PLS", width: 300 },
    { field: "jigboardType", headerName: "Jigboard Type", width: 300 },
    { field: "fixedString", headerName: "Fixed String", width: 300 },
    { field: "liveString", headerName: "Live String", width: 300 },
    { field: "work", headerName: "Work", width: 300 },
    { field: "date", headerName: "Date", width: 300 },
    { field: "dateFinished", headerName: "Date Finished", width: 300 },
  ];

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      async function getProduction() {
        const productions = await productionService.getAll();
        setProductions(productions);
        // work datası
        const workNames = productions.map((production) => production.work);
        setWork(workNames);
      }
      getProduction();
    }
  }, [productionService]);
  
   /* Abstract Class - CSVService */
   const downloadCSVFunction = (data : ProductionModel[]) =>{
    const headers = columns.map((column) => column.field);
    const fileName = "Production.csv";
    const csvService =  ServiceManager.getCSVGenerateService();
    csvService.downloadCSV(productions, fileName, headers);
  }
  /* Abstract Class - PDFService */
  const downloadPDFFunction = (data: ProductionModel[]) => {
    const headers = columns.map((column) => column.field);
    const fileName = "Production.pdf";
    const pdfService = ServiceManager.getPDFGenerateService();
    pdfService.downloadPDF(productions, fileName, headers);
  }

  /* Interface - CodesService */
  const handleDeleteClick = async (id: number):Promise <void> => {
    try {
      await productionService.delete(id);
      const updatedProduction = productions.filter((product) => product.id  !== id);
      setProductions(updatedProduction);
       // Silinen değeri Product Search kaldırma
       const deleteProduction = productions.find((product) => product.id === id);
         if (deleteProduction) {
          const updateProducts = work.filter((workName) => workName !== deleteProduction.work);
          setWork(updateProducts);
       }
    } catch (error) {
      const errorMessage = (error as Error)?.message || error?.toString();
      console.error("Silme işlemi başarısız", errorMessage);
    }
  }
    // CustomDatePickers bileşeninden gelen tarih aralığını yakalama işlevi
    const handleDateRangeSelect = (newDateRange: DateRange<Dayjs>) => {
      
      setSelectedDateRange(newDateRange);
    };
  return (
    <>
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        width: '90vw',
        height: '90vh'
      }}
    >
    {/* Component */}
    <ContentTitle
     title="Production Report"
     icon={ProductionReportIcon}    
    />
    {/* Component */}
    <Box
      sx={{ 
        display:"inline-flex",
        mt: 3,
        justifyContent:'space-evenly'
      }}
    >
     {/* Component */}
      <CustomDatePickers  onDateSelect={handleDateRangeSelect} onSelectedDate={selectedDateRange}/>
    {/* Component */}
      <AutocompleteSearch 
        label='Line Search'
        data={work}
        width='200px'
        selected={selected}
        onDataSelect={setSelected}      
      />
    </Box>
    {/* Component */}
    <Box
      sx={{
       ml:6
      }}
    >
      <ActionButton 
          titleDownloadCSV='Download CSV'
          titleDownloadPDF='Download PDF'
          data={productions}
          downloadCSV={downloadCSVFunction}
          downloadPDF={downloadPDFFunction}
      />
    </Box>
      <Grid container spacing={2}>
        <Box
          sx={{
            width: '100vw',
            p:20,
            pt:0
          }}
        >
        {/* Table Component */}
        <CustomDataGrid 
          columns={columns}
          data={productions}
          selectedData={selected}
          onDeleteClick={handleDeleteClick}
          filterColumn="work"
          showDeleteColumn={false}          
          selectedDate={selectedDateRange} // Seçilen tarih aralığını ileterek
        />
          </Box>
      </Grid>
    </Box>
    </>
  )
}

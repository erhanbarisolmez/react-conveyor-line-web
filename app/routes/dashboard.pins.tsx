import PinsIcon from '@mui/icons-material/SettingsInputHdmiOutlined';
import { Box, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from 'react';
import ActionButton from '~/src/components/ActionButton';
import AutocompleteSearch from '~/src/components/AutoCompleteSearch';
import { ContentTitle } from "~/src/components/ContentTitle";
import CustomDataGrid from '~/src/components/CustomDataGrid';
import type PinsModel from '~/src/core/models/PinsModel';
import ServiceManager from '~/src/core/services/ServiceManager';

export default function PinsContent() {
  const pinsService =  useMemo(() => ServiceManager.getPinsService(), []);
  const [pins, setPins] = useState<PinsModel[]>([]);
  const [jigboard, setJigboard] = useState<string[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "jigboard", headerName: "Jigboard", width: 300 },
    { field: "date", headerName: "Date", width: 300 },
    { field: "locationCart", headerName: "Location Cart", width: 300 },
    { field: "point", headerName: "Point", width: 300 },
    { field: "templatePos", headerName: "Template_Pos", width: 300 },
    { field: "condition", headerName: "Condition", width: 300 },
    { field: "sa", headerName: "Sa", width: 300 },
  ];
  useEffect(() =>{
    if (typeof window !== 'undefined') {
      async function getPins() {
        const pins = await pinsService.getAll();
        setPins(pins);

        // jigboard datası
        const jigboardNames = pins.map((pin) => pin.jigboard);
        setJigboard(jigboardNames);
      }
      getPins();
    }
  }, [pinsService]);
  
  /* Abstract Class - CSVService */
  function downloadCSVFunction(data: PinsModel[]): void {
    const csvService = ServiceManager.getCSVGenerateService();
    const fileName = "Pins.csv";
    const headers = columns.map((column) => column.headerName);
    csvService.downloadCSV(pins, fileName, headers);
  }

  /* Abstract Class - PDFService */
  function downloadPDFFunction(data: PinsModel[]): void {
    const pdfService = ServiceManager.getPDFGenerateService();
    const fileName = "Pins.pdf";
    const headers = columns.map((column) => column.field);
    pdfService.downloadPDF(pins, fileName, headers );
  }

  /* Interface - PinsService */
  const handleDeleteClick = async(id: number):Promise<void> =>{
    try {
      await pinsService.delete(id);
      const updatedPins = pins.filter((pin) => pin.id !== id);
      setPins(updatedPins);

      // Silinen değeri search dan kaldırma
      const deletePins = pins.find((pin) => pin.id === id);
      if (deletePins) {
        const updatedJigboard = jigboard.filter((jigboardNames) => jigboardNames !== deletePins.jigboard);
        setJigboard(updatedJigboard);
      }
    } catch (error) {
      const errorMessage = (error as Error)?.message || error?.toString();
      console.log("Silme işlemi başarısız : ",errorMessage );
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
          width: '90vw',
          height: '90vh'
        }}
      >
        {/* Component */}
         <ContentTitle 
          icon={PinsIcon} 
          title="Pin"
         />
        {/* Component */}
        <Box sx={{
          mt:3
        }}>
        <AutocompleteSearch 
          data={jigboard}
          label='Jigboard Search'
          onDataSelect={setSelected}
          selected={selected}
          width='200px' />
        </Box>
        {/* Component */}
        <Box sx={{ml:6}}>
        <ActionButton 
          titleDownloadCSV='Download CSV'
          titleDownloadPDF='Download PDF'
          data={pins} 
          downloadCSV={downloadCSVFunction} 
          downloadPDF={downloadPDFFunction} 
          />
          </Box>
        <Grid container spacing={2}>
          <Box sx={{
            width:'100vw',
            p: 20,
            pt: 0
          }}>
            {/* Table Component */}
            <CustomDataGrid 
             columns={columns} 
             data={pins} 
             selectedData={selected} 
             onDeleteClick={handleDeleteClick}
             filterColumn='jigboard'
             />
          </Box>
        </Grid>
      </Box>
    </>
  )
}

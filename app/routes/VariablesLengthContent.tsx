import VariablesLengthIcon from '@mui/icons-material/HubOutlined';
import { Box, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from 'react';
import ActionButton from '~/src/components/ActionButton';
import AutocompleteSearch from '~/src/components/AutoCompleteSearch';
import { ContentTitle } from "~/src/components/ContentTitle";
import CustomDataGrid from '~/src/components/CustomDataGrid';
import type VariablesLengthModel from '~/src/core/models/VariablesLengthModel';
import ServiceManager from '~/src/core/services/ServiceManager';


export default function VariablesLengthContent() {
  const variablesLengthService = useMemo(() => ServiceManager.getVariablesLengthService(), []);
  const [variables, setVariables] = useState<VariablesLengthModel[]>([]);
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "product", headerName: "Product", width: 300 },
    { field: "date", headerName: "Date", width: 300 },
    { field: "x4", headerName: "X4", width: 300 },
    { field: "var_", headerName: "Var", width: 300 }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      async function getVariablesLength() {
        const variables = await variablesLengthService.getAll();
        setVariables(variables);
      }
      getVariablesLength();
    }
  }, [variablesLengthService]);

  /* Abstract Class - CSVService */
  function downloadCSVFunction(data: VariablesLengthModel[]): void {
    const csvService = ServiceManager.getCSVGenerateService();
    const headers = columns.map((column) => column.field);
    const fileName = "VariablesLength.csv";
    csvService.downloadCSV(variables, fileName, headers);
  }

  function downloadPDFFunction(data: VariablesLengthModel[]): void {
    const pdfService = ServiceManager.getPDFGenerateService();
    pdfService.downloadPDF();
  }

  function deleteAllFunction(data: VariablesLengthModel[]): void {
    throw new Error('Function not implemented.');
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
          title={"Variables Length"}
          icon={VariablesLengthIcon} />

        {/* Component */}
        <Box sx={{
          mt: 3
        }}>
          <AutocompleteSearch
            label={'Product Search'}
            data={[]}
            selected={undefined}
            onDataSelect={function (selectedData: any): void {
              throw new Error('Function not implemented.');
            }} />
        </Box>
        {/* Component */}
        <ActionButton
          data={variables}
          titleDownloadCSV='Download CSV'
          titleDownloadPDF='Download PDF'
          titleDeleteAll='Delete All'
          downloadCSV={downloadCSVFunction}
          downloadPDF={downloadPDFFunction}
          deleteAll={deleteAllFunction} />

        <Grid container spacing={2}>
          <Box
            sx={{
              width: '100vw',
              p: 20,
              pt: 0
            }}
          >
            {/* Table component */}
            <CustomDataGrid
              data={variables}
              columns={columns}
              selectedData={null} />
          </Box>
        </Grid>

      </Box>
    </>
  );
}

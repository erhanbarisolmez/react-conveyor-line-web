import { Box, Button } from '@mui/material';
interface ActionProps<T>{
  downloadCSV?: (data: T[]) => void;
  downloadPDF?: (data: T[]) => void;
  deleteAll?: (data: T[]) => void;
  data: T[];
  titleDownloadCSV? : string;
  titleDownloadPDF? : string;
  titleDeleteAll? : string;
}

export default function ActionButton<T>(props: ActionProps<T> ) {


const { downloadCSV, downloadPDF, deleteAll, data, titleDownloadCSV, titleDownloadPDF, titleDeleteAll} = props;

  const handleDownloadCSV = () => {
    if(downloadCSV){
      downloadCSV(data);
    }
  }

  const handleDownloadPDF  = () => {
    if (downloadPDF) {
      downloadPDF(data);
    }
  }

  const handleDeleteAll = () =>{
    if (deleteAll) {
      deleteAll(data);
    }
  }

  return (
    <>
    
    <Box sx={{ position: 'relative', top: '0', right: '0', p:2}}>

          <Button onClick={handleDownloadCSV} > 
            {titleDownloadCSV}
          </Button>
          <Button onClick={handleDownloadPDF}>
            {titleDownloadPDF}
          </Button>
          <Button onClick={handleDeleteAll} >
            {titleDeleteAll}
          </Button>
        </Box>

    </>
  )
}

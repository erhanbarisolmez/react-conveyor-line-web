import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import type { DateRange } from '@mui/x-date-pickers-pro';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
interface CustomDataGridProps {
  data: any[];
  columns: GridColDef[];
  onDeleteClick?: (id: number) => void;
  selectedData: any | null; // seçili ürünü alacak
  filterColumn:any;
  showDeleteColumn?: boolean;
  selectedDate?: DateRange<Dayjs>; // seçilii tarihi alacak
}

CustomDataGrid.defaultProps={
  showDeleteColumn: true,
}

export default function CustomDataGrid(props: CustomDataGridProps) {
 
    const handleDeleteClick = (id:number) => {
    if (props && props.onDeleteClick) {
      props.onDeleteClick(id);
    }
  };

  const filterData = (
    data: any[],
    selectedData: any | null,
    filterColumn: any | undefined,
    selectedDate?: DateRange<Dayjs>
  ) => {
    if (!selectedData && !filterColumn) {
      return data;
    }
  
    // Tarih aralığını alın
    const startDate = selectedDate?.[0];
    const endDate = selectedDate?.[1];
  
    // Veriyi tarih aralığına göre filtreleyin
    let filteredData = data;
  
    if (selectedData && filterColumn) {
      filteredData = filteredData.filter((item: any) => item[filterColumn] === selectedData);
    }
  
    // Seçilen tarih aralığına göre ek filtreleme yapın
    if (startDate && endDate) {
      filteredData = filteredData.filter((item: any) => {
        const itemDate = dayjs(item.date); // Varsayılan tarih alanını alın, uygun şekilde ayarlayın
  
        // İlgili tarih aralığı içindeki verileri filtreleyin
        return (
          itemDate.isSame(startDate, 'day') ||
          itemDate.isSame(endDate, 'day') ||
          (itemDate.isBefore(endDate, 'day') && itemDate.isAfter(startDate, 'day'))
        );
      });
    }
  
    return filteredData;
  };
  

  const columns = [...props.columns];
  if (props.showDeleteColumn) {
    columns.push({
      field: "delete",
      headerName: "Action",
      width:100,
      renderCell:(params:any) => (
        <DeleteIcon 
            onClick={()=>handleDeleteClick((params as any).row!.id)}
            
        />
      ),
    });
  }

  return (
    <Stack spacing={1} sx={{ width: "100%" }} alignItems="flex-start">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid 
        rows={filterData(props.data, props.selectedData, props.filterColumn, props.selectedDate)} // seçili ürüne göre filtrelenmiş veri
        columns={columns}    
        disableRowSelectionOnClick 
         />
      </Box>
    </Stack>
  );
}

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

interface CustomDataGridProps {
  data: any[];
  columns: GridColDef[];
  onDeleteClick?: (id: number) => void;
  selectedData: any | null; // seçili ürünü alacak
  filterColumn:any;
  showDeleteColumn?: boolean;
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

  const filterData = (data: any[], selectedData:any | null, filterColumn:any | undefined) => {
    if (!selectedData || !filterColumn) {
      return data;
    }
    return data.filter((item: any) => item[filterColumn] === selectedData);
  }

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
        rows={filterData(props.data, props.selectedData, props.filterColumn)} // seçili ürüne göre filtrelenmiş veri
        columns={columns} 
        
        disableRowSelectionOnClick 
         />
      </Box>
    </Stack>
  );
}

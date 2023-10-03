import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface Props{
  label: string,
  width?:string,
  data: any[],
  selected: any | null; // prop seçili ürünü takip edecek
  onDataSelect: (selectedData:any | null) => void; // seçili ürünü iletecek
}
export default function AutocompleteSearch(props:Props) {
  const { width= "300px", data, onDataSelect, selected} = props;
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options= {data}
      sx={{ width: width }}
      value={selected} // seçili ürünü belirt
      onChange={(_, newValue) => {
        onDataSelect(newValue); // seçili ürünü ileten işlevi çağır
      }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}

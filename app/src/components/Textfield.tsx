import { TextField } from "@mui/material";


function Textfield(props: {label: string, variant: "standard" | "outlined" | "filled", id: string, type : string, autoComplete: string }) {
  const {label, variant, id, type, autoComplete} = props;
  return (
  <TextField id={id} label={label} variant={variant} type={type} autoComplete = {autoComplete}/>  
);
}

export default Textfield
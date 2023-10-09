import { TextField } from "@mui/material";


function Textfield(props: {label: string, variant: "standard" | "outlined" | "filled", id: string, type : string, autoComplete: string,  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const {label, variant, id, type, autoComplete, onChange} = props;
  return (
  <TextField 
  id={id} 
  label={label} 
  variant={variant} 
  type={type}
  autoComplete = {autoComplete}
  onChange={onChange}
  />  
);
}

export default Textfield
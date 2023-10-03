import Paper from "@mui/material/Paper";
import { ReactNode } from "react";
interface Props{
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
  display?:string;
  flexDirection?: string;
  justifyContent?:string;
  alignItems?:string;
  textAlign?:string;
  padding?: string;
  children?: ReactNode
}
export default function CustomPaper(props: Props) {
  const {
  width = "150px",
  height =  "150px",
  backgroundColor = '#5B66E3',
  borderRadius = "50%",
  display = "flex",
  flexDirection = "column",
  justifyContent = "center",
  alignItems ="center",
  textAlign = "center",
  padding = '15px',
  children
  }  = props;
  
  return (
     <Paper
        sx={{
                width: width,
                height:height,
                backgroundColor: backgroundColor,
                borderRadius:borderRadius ,
                display: display,
                flexDirection:flexDirection ,
                justifyContent: justifyContent,
                alignItems: alignItems,
                textAlign: textAlign,
                padding: padding,
              }}
            >
              
              {children}
            </Paper>
  );
}

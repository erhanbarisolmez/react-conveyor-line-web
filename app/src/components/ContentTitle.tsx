import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import React from "react";

interface PropsI{
  title: string;
  icon: FC;
}
export const ContentTitle: React.FC<PropsI>= (props) => {
  const {title, icon: IconComponent} = props;
  return (
    <>
      <Box sx={{position: 'relative', top:'0', right:'0'}}>
        <Box sx={{
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "center",
                   justifyContent: "center",
                   textAlign: "center",
                   gap: "8px",     
          }}>
     
          <IconComponent />
    
          <Typography> {title}</Typography>
        </Box>
     
      </Box>
      </>
  )
}

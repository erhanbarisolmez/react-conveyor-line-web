import VariablesLengthIcon from '@mui/icons-material/HubOutlined';

import ProductionReportIcon from '@mui/icons-material/AssessmentOutlined';
import CodesIcon from '@mui/icons-material/DocumentScannerOutlined';
import XVKTestIcon from '@mui/icons-material/InventoryOutlined';
import ProductionIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import ConnectorsIcon from '@mui/icons-material/SettingsInputCompositeOutlined';
import PinsIcon from '@mui/icons-material/SettingsInputHdmiOutlined';
import WecosResumeIcon from '@mui/icons-material/SummarizeOutlined';

import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Link } from '@remix-run/react';
import CustomPaper from '~/src/components/Paper';

export default function MenuGrid() {
  return (
    <>
  
    <Box sx={{ flexGrow: 1, alignContent: 'center', alignItems: 'center', color: 'white', mt: "5vh"}}>
    <Box sx={{
       display:'flex', justifyContent:"center"
    }}>
      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"100px"}} >
      <Typography sx={{color:'#5B66E3',fontWeight:"800", fontSize:24, fontFamily:['Arial']}}>FLAT 1200</Typography>
      <Typography sx={{color:'#363c83', fontWeight:"600", fontSize:20,ml:1, fontFamily:['Roboto']}}>CONVEYOR LINE</Typography>
      </Grid>
    </Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Codes */}
      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} >
      <Link to="/dashboard/Codes" style={{ textDecoration: 'none' }}>
          <CustomPaper>
             <IconButton sx={{ color: 'white', mb: 1 }}>
                <CodesIcon fontSize="large" />
              </IconButton>
             <Typography sx={{ color: 'white' }}>
                Codes
              </Typography>   
          </CustomPaper>
          </Link>
      </Grid>

      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} >
        {/* Connectors */}
      <Link to="/dashboard/Connectors" style={{ textDecoration: 'none' }}>
          <CustomPaper>
             <IconButton sx={{ color: 'white', mb: 1 }}>
                <ConnectorsIcon fontSize="large" />
              </IconButton>
              <Typography sx={{ color: 'white' }}>
                 Connectors
              </Typography>
          </CustomPaper>
          </Link>
      B</Grid>
      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} >
       {/* Variables Lenght */}
      <Link to="/dashboard/Variables-Length" style={{ textDecoration: 'none' }}>
          <CustomPaper>
              <IconButton sx={{ color: 'white', mb: 1 }}>
                <VariablesLengthIcon fontSize="large" />
              </IconButton>
              <Typography sx={{ color: 'white' }}>
                Variables Length
              </Typography>
          </CustomPaper>
          </Link>
      </Grid>
      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{}} >
          {/* Pins */}
      <Link to="/dashboard/Pins" style={{ textDecoration: 'none' }}>
          <CustomPaper>
             <IconButton sx={{ color: 'white', mb: 1 }}>
                <PinsIcon fontSize="large" />
              </IconButton>
              <Typography sx={{ color: 'white' }}>
                Pins
              </Typography>
          </CustomPaper>
          </Link>
      </Grid>
      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} >
         {/* Production */}
      <Link to="/dashboard/Production" style={{ textDecoration: 'none' }}>
          <CustomPaper>
             <IconButton sx={{ color: 'white', mb: 1 }}>
                <ProductionIcon fontSize="large" />
              </IconButton>
              <Typography sx={{ color: 'white' }}>
                Production
              </Typography> 
          </CustomPaper>
          </Link>
      </Grid>
      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} >
         {/* Production Report */}
      <Link to="/dashboard/Production-Report" style={{ textDecoration: 'none' }}>
          <CustomPaper>
             <IconButton sx={{ color: 'white', mb: 1 }}>
                <ProductionReportIcon fontSize="large" />
              </IconButton>
              <Typography sx={{ color: 'white' }}>
                Production Report
              </Typography>
          </CustomPaper>
          </Link>
      </Grid>
      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} >
      { /* Wecos-Resume */}
      <Link to="/dashboard/Wecos-Resume" style={{ textDecoration: 'none' }}>
          <CustomPaper>
             <IconButton sx={{ color: 'white', mb: 1 }}>
                <WecosResumeIcon fontSize="large" />
              </IconButton>
             <Typography sx={{ color: 'white' }}>
                Wecos-Resume
              </Typography>
              
          </CustomPaper>
          </Link>
      </Grid>
      <Grid item xs ={3} display={"flex"} justifyContent={"center"} alignItems={"center"} >
      { /* XVK Test */}
      <Link to="/dashboard/XVKTest" style={{ textDecoration: 'none' }}>
          <CustomPaper>
             <IconButton sx={{ color: 'white', mb: 1 }}>
                <XVKTestIcon fontSize="large" />
              </IconButton>
              <Typography sx={{ color: 'white' }}>
                XVK Test
              </Typography>       
          </CustomPaper>
          </Link>
      </Grid>
    </Grid>
  </Box>
  </>
  );
}

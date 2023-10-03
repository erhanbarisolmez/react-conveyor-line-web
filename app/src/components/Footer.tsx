import { Box, Typography } from "@mui/material";

function LoginFooter() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#363c83',
        position: 'fixed',
        bottom: 0,
        height: '5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'white'
      }}
    >
      <Box>
      <Typography  sx={{
        typography: 'subtitle2',
        fontFamily: 'Monospace' 
      }}>
      Copyright © ELOPAR GROUP
      </Typography>
      </Box>
 
    </Box>
  )
}

export default LoginFooter;

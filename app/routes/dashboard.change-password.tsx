import { Box, Card, Grid } from "@mui/material";
import { Link } from "@remix-run/react";
import LoginButton from "~/src/components/LoginButton";
import CustomTextField from "~/src/components/Textfield";


export default function ChangePasswordPage() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '75vh',
        backgroundColor: 'transparent',
      }}
    >
      {/* <BackgroundImage /> */}
      <Card
        sx={{
          p: 10,
          textAlign: 'center',
          justifyContent: 'center',
          maxHeight: '75vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: "flex-end",
            mb: 6,
            maxWidth: '100vh',
            justifyContent: 'center',
         
          }}
        >
          <Box sx={{color:'#5B66E3', fontSize:28, fontWeight:700}}>
          Change Password
          </Box>
      
        </Box>

        <Box sx={{ mb: 3 }}>
          <CustomTextField
            autoComplete="off"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <CustomTextField
            autoComplete="off"
            id="password"
            label="New Password"
            type="password"
            variant="outlined"
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <CustomTextField
            autoComplete="off"
            id="password"
            label="New Password Confirmation"
            type="password"
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/dashboard" prefetch='none'>
            <LoginButton buttonText="Cancel" endIcon={''} />
          </Link>

          <Link to="/dashboard" prefetch='none'>
            <LoginButton buttonText="Save" endIcon={''} />
          </Link>
        </Box>
      </Card>
    </Grid>
  );
}

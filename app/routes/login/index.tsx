import LoginIcon from '@mui/icons-material/InputOutlined';
import { Card } from '@mui/material';
import { Box } from "@mui/system";
import logoImages from '~/src/assets/images/elopar.png';
import Logo from '~/src/components/Logo';
// import BackgroundImage from '~/components/backgroundImage';
import { Link } from "@remix-run/react";
import Footer from "~/src/components/Footer";
import LoginButton from "~/src/components/LoginButton";
import CustomTextField from "~/src/components/Textfield";
import '~/style/global.css';
function LoginIndex() {
  return (
    <>

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        backgroundColor: 'transparent'   
      }}
    >
          {/* <BackgroundImage /> */}
        <Card
          sx={{
            p:10,
            textAlign:'center',
            justifyContent:'center',
          
          }}
        >
      <Box 
        sx=  {{ 
        display:'flex',
        alignItems:"center",
        mb:6,
        maxWidth:'100vh'
      }}
      >
        <Logo 
        alt='elopar'
        src={logoImages}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <CustomTextField
          autoComplete="off"
          id="username"
          label="Username"
          type="text"
          variant="outlined"
        />
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
      
      <Box>
      <Link to="/dashboard"  prefetch='none'>
      <LoginButton buttonText="Login"  endIcon={<LoginIcon/>}/>
      </Link>
      </Box>
      </Card>
      <Footer />
    </Box>

    </>
  );
}

export default LoginIndex;

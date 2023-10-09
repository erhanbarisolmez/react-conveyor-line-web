import LoginIcon from '@mui/icons-material/InputOutlined';
import { Card } from '@mui/material';
import { Box } from "@mui/system";
import logoImages from '~/src/assets/images/elopar.png';
import Logo from '~/src/components/Logo';
// import BackgroundImage from '~/components/backgroundImage';
import { Link } from '@remix-run/react';
import { useState } from 'react';
import Footer from "~/src/components/Footer";
import LoginButton from "~/src/components/LoginButton";
import CustomTextField from "~/src/components/Textfield";
import ServiceManager from '~/src/core/services/ServiceManager';
import '~/style/global.css';
function LoginIndex() {
  const auth = ServiceManager.getAuthService();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const handleLogin = async () => {
      try {
        const user = await auth.login(username, password);
        
        if (user) {
          console.log("Giriş başarılı");
          // window.location.href = "/dashboard";
        } else {
          console.log("Hata: Geçersiz kimlik bilgileri");
        }
      } catch (error) {
        console.error("İşleme hata oluştu:", error);
      }
    }
  
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
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <CustomTextField
          autoComplete="off"
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      
      <Box>
      <Link to="/dashboard"  prefetch='none'>
      <LoginButton buttonText="Login" 
       endIcon={<LoginIcon/>}
       onClick={handleLogin}
       />
       </Link>
      </Box>
      </Card>
      <Footer />
    </Box>

    </>
  );
}

export default LoginIndex;

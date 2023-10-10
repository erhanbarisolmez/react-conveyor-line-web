import LoginIcon from '@mui/icons-material/InputOutlined';
import { Card } from '@mui/material';
import { Box } from "@mui/system";
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import logoImages from '~/src/assets/images/elopar.png';
import Alert from '~/src/components/Alert';
import Footer from "~/src/components/Footer";
import LoginButton from "~/src/components/LoginButton";
import Logo from '~/src/components/Logo';
import CustomTextField from "~/src/components/Textfield";
import ServiceManager from '~/src/core/services/ServiceManager';
import '~/style/global.css';
function LoginIndex() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [alertMessage, setAlertMessage] = useState('');

  const auth = ServiceManager.getAuthService();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    const handleLogin = async () => {
      try {
        const user = await auth.login(username, password);
        
        if (user) {
          console.log("Giriş başarılı");
          navigate('/dashboard');
        } else {
          setAlertType('error');
          setAlertMessage('Hata: geçersiz bilgiler');
          setShowAlert(true);
        }
      } catch (error) {
        console.error("İşleme hata oluştu:", error);
        setAlertType('error');
        setAlertMessage('Error: invalid information');
        setShowAlert(true);
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
      <LoginButton buttonText="Login" 
       endIcon={<LoginIcon/>}
       onClick={handleLogin}
       />
      </Box>
      
      <Box sx={{
        mt:3,
        
      }}>
      {showAlert && <Alert type={alertType}  severity='error' message={alertMessage} />}
      </Box>

      </Card>
      <Footer />
    </Box>

    </>
  );
}

export default LoginIndex;

import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Divider, IconButton, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from '@remix-run/react';
import { useEffect, useState } from "react";
const Header = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection:'column',
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 3),
  transition:'display 0.3',
  "&.closed": {
    display:'none',
  },
}));

const AvatarImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
}));

interface DrawerProps {
  open: boolean;
}

function DrawerHeader({ open }: DrawerProps) {
  const [showProfile, setShowProfile] = useState(false);
  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };
  useEffect(()=>{
    if(!open){
      setShowProfile(false);
    }
  }, [open]);
  return (
    <div>
      <Header  sx={{
        backgroundColor:'transparent',
        mt:3
      }} 
      className={open ? "" : "closed"}      >
        <AvatarImage
          alt="User"
          src="https://icons.iconarchive.com/icons/iconarchive/incognito-animals/512/Bear-Avatar-icon.png" // Kullanıcı resmi yolunu buraya ekleyin
        />
        <Typography variant="h6" component={'span'}>Mr. Bear</Typography>
        <IconButton onClick={handleProfileClick}>
          <SettingsIcon></SettingsIcon>
         
        </IconButton>
      </Header>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",

        }}
      >
        {showProfile && <ProfileOptions />}
  
      </Box>
    </div>
  );
}

function ProfileOptions() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Profil seçenekleri */}
      <ListItemText primary="Change Password" onClick={() => navigate('change-password')} />
      <ListItemText primary="Sign Out" onClick={() => navigate('/')} />
    </Box>
  );
}


export default DrawerHeader;

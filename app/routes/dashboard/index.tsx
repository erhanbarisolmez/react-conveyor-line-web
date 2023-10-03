import ProductionReportIcon from '@mui/icons-material/AssessmentOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CodesIcon from '@mui/icons-material/DocumentScannerOutlined';
import DashboardIcon from '@mui/icons-material/GridViewOutlined';
import VariablesLengthIcon from '@mui/icons-material/HubOutlined';
import XVKTestIcon from '@mui/icons-material/InventoryOutlined';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ProductionIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import ConnectorsIcon from '@mui/icons-material/SettingsInputCompositeOutlined';
import PinsIcon from '@mui/icons-material/SettingsInputHdmiOutlined';
import WecosResumeIcon from '@mui/icons-material/SummarizeOutlined';
import { Card } from '@mui/material';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { CSSObject, Theme } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet, useLocation, useNavigate } from '@remix-run/react';
import * as React from 'react';
import CustomDrawerHeader from "~/src/components/DrawerHeader";

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function DashboardIndex() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  interface MenuItem{
    text: string,
    icon : React.ReactNode,
    route : string
  }
  const menuItems : MenuItem[]  = [
    { text: "Codes", icon:<CodesIcon />, route: "codes"},
    { text: "Connectors", icon:<ConnectorsIcon />, route: "connectors"},
    { text: "Variables Length", icon: <VariablesLengthIcon />, route: "variables-length"},
    { text: "Pins", icon: <PinsIcon />, route: "pins"},
    { text: "Production", icon: <ProductionIcon />, route: "production"},
    { text: "Production Report", icon: < ProductionReportIcon/>, route: "production-report"},
    { text: "Wecos Resume", icon: <WecosResumeIcon/>, route: "wecos-resume"},
    { text: "XVK Test", icon: <XVKTestIcon />, route: "XVKTest"}
  ];

const navigate = useNavigate();
const location = useLocation();

React.useEffect(() => {
  if (location.pathname === '/dashboard') {
    navigate('content');
  }
}, [location, navigate]);
  return (  
  <>
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor:'#363c83'}}> 
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Flat 1200 Conveyor Line
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
    
        <DrawerHeader>
          <Box sx={{
            display:"flex",
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
          }}> 
            <CustomDrawerHeader open={open}/>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'flex-start',
                  paddingLeft: theme.spacing(2),
                }}
                onClick={() => navigate('content')}
              >
                
                <ListItemIcon>
                  {index % 2 === 0 ? <DashboardIcon /> : <MailIcon />}
                
                </ListItemIcon>
              
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider />
        <List>
          {menuItems.map((menuItem, index) => (
    
            <ListItem key={menuItem.text} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'flex-start',
                  paddingLeft: theme.spacing(2),
                }}
                onClick={() => navigate(`/dashboard/${menuItem.route}`)}
              >
                <ListItemIcon>
                  {menuItem.icon}
                </ListItemIcon>
                
                <ListItemText primary={menuItem.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          <Box sx={{
            color:'grey',
            fontSize:16,
            fontWeight:900
            
          }}>
            
            {location.pathname.split('/').filter(Boolean).join(' - ').toLocaleUpperCase()}
            <Card sx={{
              height:'80vh',
              display:'flex',
              mt:2,
              backgroundColor:'#F8F8FC'
            }}>
            <Outlet/>
            </Card>
          </Box>
         
        </Typography>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#363c83",
          color: "white",
          textAlign: "center",
          padding: "10px",
        }}
      >
        {/* Footer içeriği */}
      </Box>
    </Box>
    </>
  );
}

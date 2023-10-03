import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function LoginButton(props: { startIcon?: React.ReactNode; endIcon?: React.ReactNode; buttonText: string;}) {
  const { startIcon, endIcon, buttonText } = props;
  return (
    <Button sx={{
      color:"#141414",
      backgroundColor:"white",
      "&:hover":{
        color:"white",
       backgroundColor:'#271D50', //1A1335
      },
      
    }}  variant="contained" startIcon={startIcon} endIcon={endIcon}>
      <Typography variant="button" >{buttonText}</Typography>
    </Button>
  );
}

export default LoginButton;



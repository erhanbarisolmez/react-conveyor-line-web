import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function LoginButton(props: { startIcon?: React.ReactNode; endIcon?: React.ReactNode; buttonText: string; onClick?: ()=>void}) {
  const { startIcon, endIcon, buttonText, onClick } = props;

  const handleClick= () => {
    if (onClick) {
      onClick();
    }
  }
  return (
    <Button sx={{
      color:"#141414",
      backgroundColor:"white",
      "&:hover":{
        color:"white",
       backgroundColor:'#271D50', //1A1335
      },
      
    }}  
    variant="contained"
    onClick={handleClick}
    startIcon={startIcon}
    endIcon={endIcon}>
      <Typography variant="button" >{buttonText}</Typography>
    </Button>
  );
}

export default LoginButton;



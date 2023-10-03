import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Logo( props :{ src: string, alt: string  }) {
  const theme = useTheme();
  const isSamllScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {src, alt} = props;
  return (
    <Box 
    >
    <img src={src} alt={alt} style={{width: isSamllScreen ? '250px' : '300px'}} />

    </Box>
  );
}

export default Logo;

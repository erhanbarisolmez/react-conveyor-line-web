import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface DialogProps{
  dialogTitle: string;
  buttonTitle?: string;
  open: boolean;
  onClose: () => void;
}
export default function FormDialog(props:DialogProps) {
  const {dialogTitle='title', buttonTitle='Add User'} = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Box>
        {buttonTitle}
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{
          flexGrow:1,
          display:'flex'
          
        }}>
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>
        </Box>
      
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

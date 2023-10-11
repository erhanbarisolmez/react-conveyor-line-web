import CloseIcon from '@mui/icons-material/Close';
import UsersIcon from '@mui/icons-material/PeopleAltOutlined';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import AutocompleteSearch from './AutoCompleteSearch';
interface DialogProps{
  dialogTitle: string;
  buttonTitle?: string;
  open: boolean;
  onClose: () => void;
  data: any[];
  selected: any | null;
  onDataSelect: (selectedData:any | null) => void; // seçili ürünü
  onUserAdd: (newUser: any) => void; // Kullanıcı ekleme işlevi
  
}
export default function FormDialog(props:DialogProps) {
  const {
    dialogTitle='title',
    buttonTitle='Add User',
    onDataSelect,
    data,
    selected,
    onUserAdd
   } = props;
  const [open, setOpen] = React.useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    //name ve password null kontrolü yap
    const newUser = {
      name: userName,
      password: password,
      permission: selected
    }
    onUserAdd(newUser);
    setUsername('');
    setPassword('');
    console.log(setUsername);
    console.log(setPassword);
    console.log(newUser);
    handleClose();
  }

  return (
    <>   
     <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Box>
        {buttonTitle}
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{
          flexGrow:1,
          display:'flex',
          justifyContent:'flex-start',
          backgroundColor:'#363c83',
          color:'white',
          alignItems:'center',
        }}>
        <DialogTitle>
          <UsersIcon sx={{ fontSize:60}}/>
        </DialogTitle>
        <DialogTitle sx={{p:0}}>
          {dialogTitle}
        </DialogTitle>
        </Box>
      
        <DialogContent >
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="email"
            fullWidth
            variant="filled"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="email"
            fullWidth
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AutocompleteSearch 
            label='Permission'
            data={data}
            onDataSelect={onDataSelect}
            selected={selected}
            textFieldVariant='filled'
            textMargin='dense'
            width='100%'
          />
          
        </DialogContent>
        <DialogActions sx={{
          justifyContent:"space-around",
          m:1
        }}>
          <Button endIcon={<CloseIcon />} onClick={handleClose}>Cancel</Button>
          <Button startIcon={<SaveIcon />}  onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>

  );
}

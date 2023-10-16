import CloseIcon from '@mui/icons-material/Close';
import UsersIcon from '@mui/icons-material/PeopleAltOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import AutocompleteSearch from './AutoCompleteSearch';

// FormDialogEdit bileşeni için gerekli prop'ları tanımlayın.
interface DialogProps {
  dialogTitle: string;
  buttonTitle: string;
  open: boolean;
  data: any[];
  onClose: () => void;
  user: any; // Düzenlenecek kullanıcı
  onUserEdit: (editedUser: any) => void;
  selected: any | null;
  onDataSelect: (selectedData:any | null) => void;
}

export default function FormDialogEdit(props: DialogProps) {
  // Props'ları alın
  const { dialogTitle, buttonTitle, open, onClose, user, onUserEdit, selected, onDataSelect,data } = props;

  // State'leri tanımlayın
  const [userName, setUserName] = useState(user.name ); // Varsayılan olarak kullanıcının adını kullanın
  const [password, setPassword] = useState(user.password); // Varsayılan olarak kullanıcının şifresini kullanın
  const [permission, setPermission] = useState<string[]>(user.permission || []);

  useEffect(()=>{
    setUserName(user.name);
    setPassword(user.password);
    setPermission(user.permission);
  }, [user]);
  // Formun geçerli olup olmadığını kontrol eden bir işlev tanımlayın
  const formIsValid = () => {
    return userName && password && selected;
  };

  // Düzenleme işlemini başlatan işlevi tanımlayın
  const handleEdit = () => {
    if (formIsValid()) {
      // Kullanıcı nesnesini güncelleyin
      const editedUser = {
        id: user.id, // Kullanıcının kimliğini koruyun
        name: userName,
        password: password,
        permission:permission
      };
      onUserEdit(editedUser); // Üst bileşene düzenlenmiş kullanıcıyı iletmek için onUserEdit işlemini çağırın
      onClose(); // Düzenleme formunu kapatın
    } else {
      alert('Please fill all fields');
    }
    setUserName('');
    setPassword('');
  };
  

  return (
    <div>
      <Button variant="outlined" onClick={onClose}>
        <Box>{buttonTitle}</Box>
      </Button>
      <Dialog open={open} onClose={onClose}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            backgroundColor: '#363c83',
            color: 'white',
            alignItems: 'center',
          }}
        >
          <DialogTitle>
            <UsersIcon sx={{ fontSize: 60 }} />
          </DialogTitle>
          <DialogTitle sx={{ p: 0 }}>{dialogTitle}</DialogTitle>
        </Box>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="text"
            fullWidth
            variant="filled"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
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
        <DialogActions
          sx={{
            justifyContent: 'space-around',
            m: 1,
          }}
        >
          <Button endIcon={<CloseIcon />} onClick={onClose}>
            Cancel
          </Button>
          <Button startIcon={<SaveAsIcon />} onClick={handleEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

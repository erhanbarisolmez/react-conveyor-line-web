import UsersIcon from '@mui/icons-material/PeopleAltOutlined';
import { Box, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from 'react';
import { ContentTitle } from "~/src/components/ContentTitle";
import CustomDataGrid from "~/src/components/CustomDataGrid";
import DialogAddUser from '~/src/components/DialogAddUser';
import type UsersModel from '~/src/core/models/UsersModel';
import ServiceManager from '~/src/core/services/ServiceManager';

export default function UsersContent() {
  const usersService =  useMemo(() => ServiceManager.getUsersService(), []);
  const authService = useMemo(() => ServiceManager.getAuthService(), []);
  const [users, setUsers] = useState<UsersModel[]>([]);
  const [permission, setPermission] = useState<string[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "permission", headerName: "Permission", width: 300 }
  ];
  useEffect(() =>{
    if (typeof window !== 'undefined') {
      async function getUsers() {
        const users = await usersService.getAll();
        setUsers(users);

        const permissionName = users.map((user) => user.permission);
        setPermission(permissionName);
      }
      getUsers();
    }
  }, [usersService]);
  
  const addUser = async (newUser:any) => {
    try {
      const addedUser = await authService.register(newUser);

      setUsers((prevUsers) => [...prevUsers, addedUser]);
    } catch (error: any) {
      console.error('only super_user can perform this action. ',error.message);
    }
  }


  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90vw',
          height: '90vh'
        }}
      >
        {/* Component */}
         <ContentTitle 
          icon={UsersIcon} 
          title="Users"
         />
     
        {/* Component */}
        <Box sx={{ml:0, mb:4, mt:3}}>
           <DialogAddUser 
            dialogTitle={'Add User'}
            open={false}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            } }
            data={permission}
            selected={selected}
            onDataSelect={setSelected} 
            onUserAdd={addUser} 

            />
          </Box>
        <Grid container spacing={2}>
          <Box sx={{
            width:'100vw',
            p: 20,
            pt: 0
          }}>
            {/* Table Component */}
            <CustomDataGrid 
             columns={columns} 
             data={users} 
             filterColumn=''
             showAddColumn={true}
             showDeleteColumn={false}
             />
          </Box>
        </Grid>
      </Box>
    </>
  )
}

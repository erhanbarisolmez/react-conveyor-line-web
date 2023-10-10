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
  const [users, setUsers] = useState<UsersModel[]>([]);
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

      }
      getUsers();
    }
  }, [usersService]);


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
        <Box sx={{ml:0, mb:6, mt:3}}>
           <DialogAddUser 
            dialogTitle={'Add User'}
            open={false}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            } } 
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
             filterColumn='jigboard'
             showAddColumn={true}
             showDeleteColumn={false}
             />
          </Box>
        </Grid>
      </Box>
    </>
  )
}

import AdminPanelAccept from './AdminPanelAccept'
import AdminPanelDelete from './AdminPanelDelete'
import {
   Grid,
} from '@material-ui/core';

export default function AdminPanel() {
   // Put them side to side using material ui grid
   return (
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <h1 style={{
               textAlign: 'center',
               fontSize: '30px',
               fontWeight: 'bold',
               color: '#3f51b5',
               marginTop: '20px',
            }}>Manager Requests</h1>
            <AdminPanelAccept />
         </Grid>
         <Grid item xs={6}>
         <h1 style={{
               textAlign: 'center',
               fontSize: '30px',
               fontWeight: 'bold',
               color: '#3f51b5',
               marginTop: '20px',
            }}>All Users</h1>
            <AdminPanelDelete />
         </Grid>
      </Grid>
   )
}


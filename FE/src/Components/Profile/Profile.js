import ProfileCard from './ProfileCard';
import AdminPanel from '../AdminPanel/AdminPanel';
import {
   Grid,
} from '@material-ui/core';


export default function Profile() {
   // put the profile card
   return (
      <Grid container spacing={3}>
         <Grid item xs={12}>
            <ProfileCard />
         </Grid>
         <Grid item xs={12}>
            <AdminPanel />
         </Grid>
      </Grid>
      
   )
}

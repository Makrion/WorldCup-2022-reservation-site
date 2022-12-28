import ProfileCard from './ProfileCard';
import AdminPanel from '../AdminPanel/AdminPanel';
import {
   Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux'


export default function Profile() {
   const userInfo = useSelector((state) => state.user.userInfo);
   const isAdmin = userInfo.role === 0;
   return (
      <Grid container spacing={3}>
         <Grid item xs={12}>
            <ProfileCard />
         </Grid>
         <Grid item xs={12}>
            {isAdmin && <AdminPanel />}
         </Grid>
      </Grid>
      
   )
}

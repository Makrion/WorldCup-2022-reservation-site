import ProfileCard from './ProfileCard';
import AdminPanel from '../AdminPanel/AdminPanel';
import {
   Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux'
import ReservedMatches from '../ReservedMatches/ReservedMatches';


export default function Profile() {
   const userInfo = useSelector((state) => state.user.userInfo);
   const isVerified = userInfo.isVerified;
   const isAdmin = userInfo.role === 0;
   const isFan =  userInfo.role === 2;
   return (
      <>
      <Grid container spacing={3}>
         <Grid item xs={12}>
            <ProfileCard />
         </Grid>
         <Grid item xs={12}>
            {isAdmin && <AdminPanel />}
         </Grid>
      </Grid>
      {!isVerified && <h1>You're Management Request Has Not Been Approved Yet</h1>}
      { isFan && <ReservedMatches />}
      </>
   )
}

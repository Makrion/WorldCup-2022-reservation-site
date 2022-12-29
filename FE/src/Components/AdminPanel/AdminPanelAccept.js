import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import PersonIcon from '@material-ui/icons/Person';
import { api } from '../../States/api';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

function AdminPanelAccept() {
  const accessToken = useSelector((state) => state.user.userInfo.accessToken);

    const icons = [<SupervisorAccountIcon />, <SportsSoccerIcon />, <PersonIcon />]

    const [users, setUsers] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true);

    const body = {page_size: 10, current_page: 1}
    // useEffect to fetch data from ${api}/user/index using axios
    React.useEffect(() => {
      axios.post(`${api}/api/user/index/unverified`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setUsers(response.data.users)
      })
      .catch((error) => {
        console.log(error);
      })
    }, [])



  return (
    !isLoading?(<List style={{
      marginLeft: '10px',
      marginRight: '10px',
    }}>
      {users.map((user) => (
        <ListItem key={user.id}>
          <ListItemIcon>
            {icons[user.role]}
          </ListItemIcon>
          <ListItemText
            primary={user.username}
            secondary={user.email}
          />
          <ListItemSecondaryAction>
            <Button variant="contained" color="primary" 
            style={{marginRight: '20px'}}
            >
              Accept as Coach
            </Button>

          </ListItemSecondaryAction>
        </ListItem>
      ))}</List>):(<ReactLoading style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '3rem',
      width: '3rem',
      height: '10%',
      color: '#23359d',

    }} type="balls" color='#23359d' height={10} width={10} />)
  );
}

export default AdminPanelAccept;

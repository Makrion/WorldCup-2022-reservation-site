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



function AdminPanel() {
  const accessToken = useSelector((state) => state.user.userInfo.accessToken);

    const icons = [<SupervisorAccountIcon />, <SportsSoccerIcon />, <PersonIcon />]
    const [isLoading, setIsLoading] = React.useState(true);

    const [users, setUsers] = React.useState([])

    const body = {page_size: 10, current_page: 1}
    // useEffect to fetch data from ${api}/user/index using axios
    React.useEffect(() => {
      axios.post(`${api}/api/user/index/`, body, {
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

    const deleteUser = (id) => {
      axios.delete(`${api}/api/user/delete/`,id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        alert(response);
      })
      .catch((error) => {
        alert(error);
      })
    }


  return (
    
    !isLoading?(<List>
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
            <Button variant="contained" 
            style={{
              color: 'white',
              backgroundColor: '#23359d',
            }}
            onClick={() => deleteUser(user.id)}
            >
              Delete
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>):(<ReactLoading style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '3rem',
      width: '3rem',
      height: '10%',
      color: '#23359d',

    }} type="balls" color='#23359d' height={10} width={10} />)
  );
}

export default AdminPanel;

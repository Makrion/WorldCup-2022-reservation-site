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
function AdminPanelAccept() {
   const items = [
      {
        id: 1,
        icon: <SupervisorAccountIcon />,
        title: 'John Legend',
        subtitle: 'john_leg@gmail.com',
        buttonText1: 'Accept as Manager',
        buttonText2: 'Deny',
      },
      {
        id: 2,
        icon: <SportsSoccerIcon />,
        title: 'Gordon Ramsey',
        subtitle: 'Gordon@Ramsey.com',
        buttonText1: 'Accept as Manager',
        buttonText2: 'Deny',
      },
      {
        id: 3,
        icon: <PersonIcon />,
        title: 'Taric Boi',
        subtitle: 'Taric@Boi.com',
        buttonText1: 'Accept as Manager',
        buttonText2: 'Deny',

      },
    ];
  return (
    <List style={{
      marginLeft: '10px',
      marginRight: '10px',
    }}>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            secondary={item.subtitle}
          />
          <ListItemSecondaryAction>
            <Button variant="contained" color="primary" 
            style={{marginRight: '20px'}}
            >
              {item.buttonText1}
            </Button>
            <Button variant="contained" color="primary">
              {item.buttonText2}
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default AdminPanelAccept;

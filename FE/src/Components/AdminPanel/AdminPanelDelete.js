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
function AdminPanel() {
   const items = [
      {
        id: 1,
        icon: <SupervisorAccountIcon />,
        title: 'John Legend',
        subtitle: 'john_leg@gmail.com',
        buttonText: 'Delete User',
      },
      {
        id: 2,
        icon: <SportsSoccerIcon />,
        title: 'Gordon Ramsey',
        subtitle: 'Gordon@Ramsey.com',
        buttonText: 'Delete User',
      },
      {
        id: 2,
        icon: <PersonIcon />,
        title: 'Taric Boi',
        subtitle: 'Taric@Boi.com',
        buttonText: 'Delete User',
      },
    ];
  return (
    <List>
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
            <Button variant="contained" color="primary">
              {item.buttonText}
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default AdminPanel;

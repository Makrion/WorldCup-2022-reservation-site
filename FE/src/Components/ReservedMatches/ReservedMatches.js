import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ReservedMatches() {
  const classes = useStyles();
  const [matches, setMatches] = React.useState([]);

  const mockReservedMatches = [
    {
      match_id: 1,
      date: 1672324713,
      name: "Match 1",
      seatType: "Normal",
      tickerNumber: "a3248jsdfi323",
    },
    {
      match_id: 2,
      date: 1672324713,
      name: "Match 2",
      seatType: "VIP",
      tickerNumber: "a3248jsdfi323",
    },
  ];

  const handleCancelReservation = (matchId) => {
    // TODO: Cancel the reservation for the match with the given matchId
  };

  return (
    <List className={classes.root}>
      {mockReservedMatches.map((match) => (
        <ListItem key={match.match_id}>
          <ListItemText primary={match.name} secondary={`Date: ${match.date} | Seat type: ${match.seatType} | Ticket number: ${match.tickerNumber}`} />
          <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleCancelReservation(match.match_id)}>
            Cancel reservation
          </Button>
        </ListItem>
      ))}
    </List>
  );
}


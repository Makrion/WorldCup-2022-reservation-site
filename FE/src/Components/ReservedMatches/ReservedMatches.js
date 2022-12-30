import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { api } from '../../States/api';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '80%',
    marginLeft: '3rem'

  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
    color: 'white'
  },
}));

export default function ReservedMatches() {
  const classes = useStyles();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [matches, setMatches] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    const body = { page_size: 20, current_page: 1 }

    axios.get(`${api}/api/tickets`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      setIsLoading(false);
      alert('success')
      console.log(response.data)
    })
    .catch((error) => {
      alert('ouch')
      console.log(error);
    })
  }, [])
  




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
    <>
    <h1 style={{marginLeft: '3rem'}}>Your Reserved Matches</h1>
    <List className={classes.root}>
      {mockReservedMatches.map((match) => (
        <ListItem key={match.match_id}>
          <ListItemText primary={match.name} secondary={`Date: ${match.date} | Seat type: ${match.seatType} | Ticket number: ${match.tickerNumber}`} />
          <Button variant="contained"  className={classes.button} onClick={() => handleCancelReservation(match.match_id)}>
            Cancel reservation
          </Button>
        </ListItem>
      ))}
    </List>
    </>
  );
}


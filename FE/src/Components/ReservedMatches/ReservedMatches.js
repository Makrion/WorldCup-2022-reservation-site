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
import { authHeader } from '../../auth';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '80%',
    marginLeft: '3rem'
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
    color: 'white',
    float: 'right',
  },
  ListItemText: {
    color: '#3f51b5',
    cursor: 'pointer'
  }
}));

export default function ReservedMatches() {
  const classes = useStyles();
  const accessToken = useSelector((state) => state.user.userInfo.accessToken);
  const user_id = useSelector((state) => state.user.userInfo.id)
  const [matches, setMatches] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);



   React.useEffect(() => {
     const body = { page_size: 20, current_page: 1 }

    axios.get(`${api}/api/tickets`,
    {
      params: {
        page_size: 32,
        current_page: 1
      },
      headers: authHeader(accessToken)
    }
    ).then((response) => {
      console.log(response.data.matches)
      setIsLoading(false)
      const user_matches = []
      for (let i=0; i<response.data.matches.length ;i++){
        let match = response.data.matches[i]
        if (match.user_id === user_id)     user_matches.push(match)
      }
      setMatches(user_matches)
    }).catch((erroro) => {
      alert("Error connecting to the server :(")
    });
     
   }, [])
  



  const handleCancelReservation = (ticketId) => {
    Axios({
      method: "DELETE",
      url: `${api}/api/ticket/delete/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ticket_number: ticketId
      },
    })
    .then((response) => {
      setMatches(matches.filter((match) => match.ticket_number !== ticketId))
    })
    .catch((error) => {
      alert(error);
    })
  };

  return (
    <>
    <h1 style={{marginLeft: '3rem'}}>Your Reserved Matches</h1>
    {!isLoading && <List className={classes.root}>
      {matches.map((match) => (
        <ListItem key={match.match_id}>
          <Link to={`/ViewMatch/${match.match_id}`}
          style={{
            textDecoration: 'none',
          }}>
          <ListItemText  className={classes.ListItemText} primary={`Match ${match.match_id}`} secondary={`Date: ${new Date(match.reservation_date).toISOString().split('T')[0]} | Seat type: ${match.seat} | Ticket number: ${match.ticket_number} | Seat Location: row ${match.seat_row? match.seat_row:'unspecified'} column${match.seat_number? match.seat_number:'unspecified'}`} />
          </Link>
          <Button variant="contained"  className={classes.button} onClick={() => handleCancelReservation(match.ticket_number)}>
            Cancel reservation
          </Button>
        </ListItem>
      ))}
    </List>}
    {isLoading && <ReactLoading  color='#3f51b5'></ReactLoading>}
    </>
  );
}


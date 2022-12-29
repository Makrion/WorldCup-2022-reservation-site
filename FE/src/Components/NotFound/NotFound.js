import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import 'typeface-poppins';  // Import the Poppins font

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fafafa',
  },
  text: {
    color: '#23359d',
    fontFamily: 'Poppins',  // Use the Poppins font
  },
}));

function NotFound() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h5" className={classes.text}>
          Oops! The page you are looking for is not inStadium!
        </Typography>
        <Button variant='contained' style={{width: '150px', margin: '20px'}} onClick={() => history.push('/')}>Take me home!</Button>
      </div>
    </Box>
  );
}

export default NotFound;

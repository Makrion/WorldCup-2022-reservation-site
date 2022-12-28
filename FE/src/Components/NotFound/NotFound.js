import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
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

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.text}>
        Oops! The page you are looking for is not inStadium!
      </Typography>
    </Box>
  );
}

export default NotFound;

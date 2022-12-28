import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Box,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginTop: theme.spacing(1),
    width: '30rem',

  },
  button: {
    marginTop: theme.spacing(2),
    color: 'white',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  },
  signUpHint: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
}));

function SignIn() {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!values.username) {
      isValid = false;
      newErrors.username = 'Username is required';
    } else {
      newErrors.username = '';
    }

    if (!values.password) {
      isValid = false;
      newErrors.password = 'Password is required';
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Login successful');
      setSubmitted(true);

    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {submitted && (
        <Alert severity="success">
          Login successful!
        </Alert>
      )}
      <TextField
        className={classes.textField}
        label="Username"
        name="username"
        value={values.username}
        onChange={handleChange}
        error={Boolean(errors.username)}
        helperText={errors.username}
      />
      <TextField
        className={classes.textField}
        label="Password"
        type={values.showPassword ? 'text' : 'password'}
        name="password"
        value={values.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
          disabled={submitted}
        >
          Login
        </Button>
      </Box>
      <Box mt={1} className={classes.signUpHint}>
        Don't have an account? <a href="/signup">Sign up</a>
      </Box>
    </form>
  );
}

export default SignIn;


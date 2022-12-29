import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Box,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signUpAPI } from '../../States/UserState/UserSlice';
import { useHistory } from 'react-router-dom';


function SignUp() {
  const inferredRole = useSelector(state => state.home.inferredRole);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.user.isLoading);
  const signUpError = useSelector((state) => state.user.error);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    country: '',
    password: '',
    gender: '',
    role: inferredRole,
    birthDate: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    country: '',
    password: '',
    gender: '',
    role: '',
    birthDate: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!values.firstName) {
      isValid = false;
      newErrors.firstName = 'First name is required';
    } else {
      newErrors.firstName = '';
    }

    if (!values.lastName) {
      isValid = false;
      newErrors.lastName = 'Last name is required';
    } else {
      newErrors.lastName = '';
    }

    if (!values.username) {
      isValid = false;
      newErrors.username = 'Username is required';
    } else {
      newErrors.username = '';
    }

    if (!values.email) {
      isValid = false;
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      isValid = false;
      newErrors.email = 'Invalid email address';
    } else {
      newErrors.email = '';
    }

    if (!values.password) {
      isValid = false;
      newErrors.password = 'Password is required';
    } else {
      newErrors.password = '';
    }

    if (!values.gender) {
      isValid = false;
      newErrors.gender = 'Gender is required';
    } else {
      newErrors.gender = '';
    }

    if (!values.role) {
      isValid = false;
      newErrors.role = 'Role is required';
    } else {
      newErrors.role = '';
    }

    if (!values.birthDate) {
      isValid = false;
      newErrors.birthDate = 'birthdate is required';
    } else {
      newErrors.birthDate = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, submit it to the server
      setSubmitted(true);
    }
  };
    //whenevr isLoggedIn is changed, it will redirect to home page
    useEffect(() => {
      if(isLoggedIn){
        history.push('/');
      }
    }, [isLoggedIn]);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {submitted && (
        (isLoading)?(<Alert style={{marginTop: '1rem',}} severity="info">Loading</Alert>):(signUpError)?(<Alert style={{marginTop: '1rem',}} severity="error">{signUpError}</Alert>):(<Alert style={{marginTop: '1rem',}} severity="success">Sign Up Successful</Alert>)
      )}
      <TextField
        className={classes.textField}
        label="First Name"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        error={Boolean(errors.firstName)}
        helperText={errors.firstName}
      />
      <TextField
        className={classes.textField}
        label="Last Name"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        error={Boolean(errors.lastName)}
        helperText={errors.lastName}
      />
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
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          id="country"
          name="country"
          value={values.country}
          onChange={handleChange}
          error={Boolean(errors.country)}
        >

         <MenuItem value="Egypt">Egypt</MenuItem>
         <MenuItem value="USA">USA</MenuItem>
         <MenuItem value="UK">UK</MenuItem>
         <MenuItem value="France">France</MenuItem>
         <MenuItem value="Germany">Germany</MenuItem>
         <MenuItem value="China">China</MenuItem>
         <MenuItem value="Japan">Japan</MenuItem>
         <MenuItem value="India">India</MenuItem>
         <MenuItem value="Russia">Russia</MenuItem>
         <MenuItem value="Canada">Canada</MenuItem>
         <MenuItem value="Brazil">Brazil</MenuItem>
         <MenuItem value="Australia">Australia</MenuItem>
         <MenuItem value="Mexico">Mexico</MenuItem>
         <MenuItem value="Indonesia">Indonesia</MenuItem>
         <MenuItem value="Nigeria">Nigeria</MenuItem>
         <MenuItem value="Argentina">Argentina</MenuItem>
         <MenuItem value="South Africa">South Africa</MenuItem>
         <MenuItem value="Colombia">Colombia</MenuItem>
         <MenuItem value="Spain">Spain</MenuItem>
         <MenuItem value="Italy">Italy</MenuItem>
         <MenuItem value="Turkey">Turkey</MenuItem>
         <MenuItem value="Thailand">Thailand</MenuItem>
         <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>

        </Select>
        {Boolean(errors.country) && <FormHelperText>{errors.country}</FormHelperText>}
      </FormControl>
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
      <FormControl className={classes.formControl}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          value={values.gender}
          onChange={handleChange}
          error={Boolean(errors.gender)}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
        {Boolean(errors.gender) && <FormHelperText>{errors.gender}</FormHelperText>}
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          error={Boolean(errors.role)}
          >
            <MenuItem value="Coach" >Coach</MenuItem>
            <MenuItem value="Fan">Fan</MenuItem>
          </Select>
          {Boolean(errors.role) && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>
        <TextField
          className={classes.textField}
          label="birthdate"
          type="date"
          name="birthDate"
          InputProps={{inputProps: { min: "1970-01-01", max: "2017-01-01"} }}
          value={values.birthDate}
          onChange={handleChange}
          error={Boolean(errors.birthDate)}
          helperText={errors.birthDate}
            InputLabelProps={{
               shrink: true,
            }}

        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            disabled={submitted && isLoading}
            onClick={() => dispatch(signUpAPI({ username: values.username, 
                                                password: values.password, 
                                                email: values.email, 
                                                first_name: values.firstName, 
                                                last_name: values.lastName, 
                                                nationality: values.country, 
                                                role:(values.role==='Fan'? 2 :(values.role==='Coach'? 1 :'')), 
                                                gender:(values.gender==="Male")?'m':(values.gender==="Female")?'f':'',
                                                birth_date: (new Date(values.birthDate)).getTime()/1000
                                              }))}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    );
  }

  const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textField: {
      margin: theme.spacing(1),
      width: '30rem',
        padding: '5px',
        '&:focus': {
           backgroundColor: 'transparent', // Remove the blue highlight
         },
        
    },
    formControl: {
      margin: theme.spacing(1),
      width: '30rem',
    },
    button: {
      margin: theme.spacing(1),
  
     backgroundColor: '#23359d',
        color: 'white',
     '&:hover': {
       transform: 'scale(1.1)',
     },
  
    },
  }));
  
  export default SignUp;
  

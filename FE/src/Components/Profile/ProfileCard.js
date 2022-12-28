import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '90%',
    margin: theme.spacing(2),
    // set some border radius
    borderRadius: '20px',
    // set some border color
    border: '4px solid #3f51b5',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #3f51b5',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTextField: {
    marginRight: '1rem',
  },
}));

function ProfileCard() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  // maybe fix gender and birthdate initial values
  const [submitValues, setSubmitValues] = useState({
    firstName: '',
    lastName: '',
    country: '',
    oldPassword: '',
    newPassword: '',
    gender: '',
    birthdate: '',
  });

  const values = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'ewi@outlook.com',
    birthdate: '01/01/2000',
    gender: 'Male',
    country: 'USA',
    role: 'Fan',
  }


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChangeFirstName = (event) => {
    setSubmitValues({ ...submitValues, firstName: event.target.value });
   };


   const handleChangeLastName = (event) => {
    setSubmitValues({ ...submitValues, lastName: event.target.value });
    };
  
    const handleChangeBirthdate = (event) => {
      setSubmitValues({ ...submitValues, birthdate: event.target.value });
    };
  
    const handleChangeGender = (event) => {
      setSubmitValues({ ...submitValues, gender: event.target.value });
    };
  
    const handleChangeCountry = (event) => {
      setSubmitValues({ ...submitValues, country: event.target.value });
    };

    const handleChangeOldPassword = (event) => {
      setSubmitValues({ ...submitValues, oldPassword: event.target.value });
    };

    const handleChangeNewPassword = (event) => {
      setSubmitValues({ ...submitValues, newPassword: event.target.value });
    };



    const name = values.firstName + " " + values.lastName

  
    return (
      <Card className={classes.card}>
        <CardHeader title={name} style={{
          backgroundColor: '#23359d',
          color: 'white'
        }} />
        <CardContent>
         <Grid container spacing={3}>
          <Grid item xs={6}>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Username:</span> {values.username}</Typography>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Email:</span> {values.email}</Typography>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Role:</span> {values.role}</Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Birthdate:</span> {values.birthdate}</Typography>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Gender:</span> {values.gender}</Typography>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Country:</span> {values.country}</Typography>
          </Grid>
          </Grid>
          <Button onClick={handleOpenModal} 
          style={{
            // push button to the right
            float: 'right',
            margin: '1rem',
            color: 'white',
            backgroundColor: '#23359d',
            borderRadius: '10px',

          }}
          >
            Modify
            </Button>
          <Modal
            className={classes.modal}
            open={modalOpen}
            onClose={handleCloseModal}

          >
            <div className={classes.modalPaper}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
              <h2 style={{
                marginBottom: '1rem',
              }}>Update Profile</h2>
              <TextField
                label="First Name"
                value={submitValues.firstName}
                onChange={handleChangeFirstName}
                className={classes.modalTextField}
              />
              <TextField
                label="Last Name"
                value={submitValues.lastName}
                onChange={handleChangeLastName}
                className={classes.modalTextField}
              />
              <TextField
                label="Birthdate"
                InputLabelProps={{
                  shrink: true,
               }}
                type="date"
                value={submitValues.birthdate}
                onChange={handleChangeBirthdate}
                className={classes.modalTextField}
              />
              </Grid>
              <Grid item xs={12}>
              <Select value={submitValues.gender} className={classes.modalTextField}
               onChange={handleChangeGender}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <Select value={submitValues.country} className={classes.modalTextField}
               onChange={handleChangeCountry}>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="Mexico">Mexico</MenuItem>
              </Select>
              </Grid>
              {/* One more grid cell for password change */}
              <Grid item xs={12}>
              <TextField label="Old Password" type="password" onChange={handleChangeOldPassword} className={classes.modalTextField} />
              <TextField label="New Password" type="password" onChange={handleChangeNewPassword} className={classes.modalTextField} />
              </Grid>

              </Grid>
              <Button onClick={handleCloseModal}
              style={{
                // push button to the right
                float: 'right',
                marginLeft: '1rem',
                color: 'white',
                backgroundColor: '#23359d',
              }}
              >
              Update
            </Button>
              <Button onClick={handleCloseModal}
              style={{
                // push button to the right
                float: 'right',
                border: '1px solid #3f51b5',
              }}
              >
              Close
            </Button>
          </div>
        </Modal>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;

  
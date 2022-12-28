import React, { useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { updateAPI } from '../../States/UserState/UserSlice';
import { SetUserInfo } from '../../States/UserState/UserSlice';

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
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const updateError = useSelector((state) => state.user.updateError);
  const updateSuccess = useSelector((state) => state.user.updateSuccess);
  const updateIsLoading = useSelector((state) => state.user.updateIsLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    if (updateSuccess) {
      handleCloseModal();
    }
  }, [updateSuccess]);

  const [submitted, setSubmitted] = useState(false);



  // maybe fix gender and birthDate initial values
  const [submitValues, setSubmitValues] = useState({
    firstName: '',
    lastName: '',
    country: userInfo.country,
    oldPassword: '',
    newPassword: '',
    gender: userInfo.gender,
    birthDate: '',
    accessToken: userInfo.accessToken,
  });


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
  
    const handleChangebirthDate = (event) => {
      setSubmitValues({ ...submitValues, birthDate: event.target.value });
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

    const name = userInfo.firstName + " " + userInfo.lastName
    const roles = ['Admin', 'Coach', 'Fan']

  if (isLoggedIn){
    return (
      <Card className={classes.card}>
        <CardHeader title={name} style={{
          backgroundColor: '#23359d',
          color: 'white'
        }} />
        <CardContent>

         <Grid container spacing={3}>
          <Grid item xs={6}>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Username:</span> {userInfo.username}</Typography>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Email:</span> {userInfo.email}</Typography>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Role:</span> {roles[userInfo.role]}</Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="h6"><span style={{color:'#23359d'}}>birthDate:</span> {(new Date(userInfo.birthDate)).toISOString().split('T')[0]}</Typography>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Gender:</span> {userInfo.gender}</Typography>
          <Typography variant="h6"><span style={{color:'#23359d'}}>Country:</span> {(userInfo.country)?(userInfo.country):"Unspecified"}</Typography>
          </Grid>
          </Grid>
          <Button onClick={handleOpenModal} 
          style={{
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
              <Alert severity="error" style={{ display: submitted && (updateError||!submitValues.oldPassword) ? 'block' : 'none' }}>
            Could not process your request. Make sure that the old password is correct.
            </Alert>
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
                label="birthDate"
                InputLabelProps={{
                  shrink: true,
               }}
                type="date"
                value={submitValues.birthDate}
                onChange={handleChangebirthDate}
                className={classes.modalTextField}
              />
              </Grid>
              <Grid item xs={12}>
              <Select value={submitValues.gender} className={classes.modalTextField}
               onChange={handleChangeGender}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              <Select value={submitValues.country} className={classes.modalTextField}
               onChange={handleChangeCountry}>
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
              </Grid>
              {/* One more grid cell for password change */}
              <Grid item xs={12}>
              <TextField label="Old Password" required type="password" onChange={handleChangeOldPassword} className={classes.modalTextField} />
              <TextField label="New Password" type="password" onChange={handleChangeNewPassword} className={classes.modalTextField} />
              </Grid>

              </Grid>
              <Button 
              disabled={updateIsLoading}
              onClick={()=> {
                setSubmitted(true)
                if(submitValues.oldPassword)
                {
                dispatch(updateAPI(submitValues)); 
                }
              }
              }
              style={{
                // push button to the right
                float: 'right',
                marginLeft: '1rem',
                color: 'white',
                backgroundColor: (!updateIsLoading)?'#23359d':'#4f63d9',
                border: '1px solid #3f51b5',
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
  else {
    return (
      <div>
        <p>You are not logged in.</p>
      </div>
    );
  }
}

export default ProfileCard;

  
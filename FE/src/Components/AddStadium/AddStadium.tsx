import React, { useEffect, useState } from "react";
import { Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { authHeader } from "../../auth";
import axios from 'axios'
import { validate } from "../../Common";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddStadium() {
  const accessToken = useSelector((state: any) => state.user.userInfo.accessToken);
  const role = useSelector((state: any) => state.user.userInfo.role);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const isVerified = useSelector((state: any) => state.user.userInfo.isVerified);

  const history = useHistory();
  if (!isLoggedIn || role >= 2 || !isVerified) {
    history.push('/NotFound');
  }

  const [stadiumName, setStadiumName] = useState('');
  const [numRows, setNumRows] = useState('');
  const [seatsPerRow, setSeatsPerRow] = useState('');


  const [errors, setErrors] = useState({
    stadiumName: '',
    numRows: '',
    seatsPerRow: ''
  });

  const [validInputs, setValidInputs] = useState(true);

  // Only validate inpenuts (and thus show errors)
  // When validInputs is false. 
  // It starts as true and is set to false for the first time when we press `create match`
  // with invalid inputs.
  useEffect(() => { !validInputs && validateInputs() }, [numRows, seatsPerRow, stadiumName]);

  const validateInputs = () => {
    console.log(stadiumName)
    console.log(numRows)
    console.log(seatsPerRow)

    let newErrors = { ...errors };

    const checkInt = (intStr: string) => {
      let parsed = Number.parseInt(intStr);
      return intStr.length > 0  && !Number.isNaN(parsed)  && parsed !== undefined;
    }

    newErrors.stadiumName = validate(stadiumName, 'Stadium name', (t) => t.length > 0);
    newErrors.numRows = validate(numRows, 'Number of rows', checkInt);
    newErrors.seatsPerRow = validate(seatsPerRow, 'Seats per row', checkInt);
    console.log(newErrors)

    setErrors(newErrors);

    let validInputs =
      newErrors.stadiumName.length === 0 && newErrors.numRows.length === 0 && newErrors.seatsPerRow.length === 0;

    setValidInputs(validInputs)

    return validInputs;
  }


  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>Add a stadium</h1>


      <div style={{ padding: '10px', width: '420px'}}>
        <TextField
          id="outlined-basic"
          label="Stadium Name"
          variant="outlined"
          fullWidth
          onChange={(e) => setStadiumName(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <div style={{padding: '10px'}}>
          <TextField
            id="outlined-basic"
            label="Number of rows"
            variant="outlined"
            style={{ width: '200px' }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => setNumRows(e.target.value)}
            error={Boolean(errors.numRows)}
            helperText={errors.numRows}
          />
        </div>

        <div style={{padding: '10px'}}>
          <TextField
            id="outlined-basic"
            label="Seats per row"
            variant="outlined"
            style={{width: '200px'}}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => setSeatsPerRow(e.target.value)}
            error={Boolean(errors.seatsPerRow)}
            helperText={errors.seatsPerRow}
          />
        </div>
      </div>



      <Button
        onClick={() => addStadiumRequest(stadiumName, numRows, seatsPerRow, validateInputs, accessToken)}
        style={{ width: '420px', borderRadius: 2, margin: '10px'}}
        variant="outlined"
        fullWidth
        disabled={!validInputs}
      >
        Add Stadium
      </Button>



    </div>
  );
}

function addStadiumRequest(
  stadiumName: string,
  numRows: string,
  seatsPerRow: string,
  validateInputs: () => boolean,
  authToken: string
) {

  let valid = validateInputs()

  if (!valid) return;

  let rows = Number.parseInt(numRows);
  let seats = Number.parseInt(seatsPerRow);

  let postData = {
    name:stadiumName,
    total_number_of_seats: rows * seats,
    number_of_rows_in_vip: rows,
    number_seats_per_row: seats,
    shape: "rectangular"
  };

  axios.post(
    'api/stadium/create',
    postData,
    { headers: authHeader(authToken) }
  ).then((response) => {
    console.log(response);
    if (response.status === 200) {
      alert('Stadium added successfully');
    } else {
      alert('Error creating match')
    }
  }).catch((error) => {
    alert("Request failed :(\nPlease make sure the data is valid and that the stadium doesn't already exist")
  });
}
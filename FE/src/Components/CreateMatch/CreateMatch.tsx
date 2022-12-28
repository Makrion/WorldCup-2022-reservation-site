import React, { useEffect, useState } from "react";
import { Box, TextField, MenuItem, Button } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { authHeader } from "../../auth";
import axios from 'axios'

type ReactCallback<T> = React.Dispatch<React.SetStateAction<T>>;

type Stadium = {
  id: number
  name: string
};

export default function CreateMatch() {
  const defaultStadium: Stadium = {
    id: 0,
    name: ''
  };

  const [isLoading, setIsLoading] = useState(true);

  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [stadium, setStadium] = useState(defaultStadium);
  const [mainRef, setMainRef] = useState('');
  const [firstLineRef, setFirstLineRef] = useState('');
  const [secondLineRef, setSecondLineRef] = useState('');


  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  defaultDate.setHours(defaultDate.getHours() + 1);
  const [date, setDate] = useState(defaultDate);

  const [stadiums, setStadiums] = useState(new Array<Stadium>());
  const [teams, setTeams] = useState(new Array<string>());
  const [refs, setRefs] = useState(new Array<string>());

  useEffect(() => {
    setTimeout(
      () => {
        fetchTeams(setTeams);
        fetchRefs(setRefs);
        fetchStadiums(setStadiums);
      },
      2000
    )
  }, []);

  useEffect(
    () => {
      let allLoaded = (teams !== null && stadiums !== null && refs !== null)
        && (teams.length > 0 && stadiums.length > 0 && refs.length > 0);

      setIsLoading(!allLoaded);
    },
    [teams, stadiums, refs]
  )

  const clearData = () => {
    setTeam1('');
    setTeam2('');
    setStadium(defaultStadium);

    setMainRef('');
    setFirstLineRef('');
    setSecondLineRef('');
  }

  const enableCreateMatchButton: () => boolean = () => {
    let enable = team1.length > 0
      && team2.length > 0
      && stadium.id >= 0
      && mainRef.length > 0
      && firstLineRef.length > 0
      && secondLineRef.length > 0
      && team1 !== team2
      && mainRef !== firstLineRef 
      && mainRef !== secondLineRef
      && firstLineRef !== secondLineRef
      && date.getTime() > Date.now();

      return enable;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {isLoading && loading()}
      {!isLoading && <div>
        <h1 style={{ textAlign: 'center', padding: '20px' }}>Create Match</h1>


        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 20 }}>
            {dropDown(team1, teams, 'Choose Team 1', '200px', setTeam1)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dropDown(team2, teams, 'Choose Team 2', '200px', setTeam2)}
          </div>
        </div>


        <div style={{ paddingTop: '20px', }}>
          {dropDown(stadium.name, stadiums.map((s) => s.name), 'Choose a stadium!', '420px', (sName) => setStadium(stadiums.find((s) => s.name === sName)!!))}
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 20px 0 0'
              }}
            >
              {matchDate(date, setDate)}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 20px 0 0'
              }}
            >
              {matchTime(date, setDate)}
            </div>
          </div>
        </LocalizationProvider>

        <div style={{ paddingTop: '20px' }}>
          {dropDown(mainRef, refs, 'Main referee!', '420px', setMainRef)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 20 }}>
            {dropDown(firstLineRef, refs, 'First line referee', '200px', setFirstLineRef)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dropDown(secondLineRef, refs, 'Second line referee', '200px', setSecondLineRef)}
          </div>
        </div>

        <Button
          onClick={() => createMatchRequest(team1, team2, stadium, mainRef, firstLineRef, secondLineRef, date, clearData)}
          style={{ width: '420px', borderRadius: 2 }}
          variant="outlined"
          fullWidth
          disabled = { !enableCreateMatchButton() }
        >
          Create Match
        </Button>

      </div>
      }
    </div>
  );
}

function loading() {
  return (
    <h1>
      Loading ...
    </h1>
  )
}

function createMatchRequest(
  team1: string,
  team2: string,
  stadium: Stadium,
  mainRef: string,
  firstLineRef: string,
  secondLineRef: string,
  date: Date,
  clearData: () => void
) {
  let t1 = Number.parseInt(team1.replace('Team ', ''));
  let t2 = Number.parseInt(team2.replace('Team ', ''));
  let stadium_id = stadium.id;
  let time = Math.trunc(date.getTime() / 1000);

  console.log(t1);
  console.log(t2);
  console.log(stadium_id);
  console.log(mainRef);
  console.log(firstLineRef);
  console.log(secondLineRef);
  console.log(time);

  let postData = {
    "team_1": t1,
    "team_2": t2,
    "main_ref": mainRef,
    "lineman_1": firstLineRef,
    "lineman_2": secondLineRef,
    "match_date": time,
    "stadium_id": stadium_id
  };

  console.log(postData);

  axios.post(
    'api/match/create', 
    postData,
    { headers: authHeader() }
  ).then((response) => {
    console.log(response);
    if (response.status === 200) {
      alert('Match created successfully');
    } else {
      alert('Error creating match')
    }
  }).catch((error) => {
    alert("Request failed :(\nPlease make sure the data is valid")
  });
}


function fetchTeams(setTeams: ReactCallback<Array<string>>){
  let teams = Array.from(Array(32).keys()).map((teamNumber) => `Team ${teamNumber}`);
  setTeams(teams);
}

function fetchStadiums(setData: ReactCallback<Array<Stadium>>) {
  axios.get('api/stadiums', 
  {
      params: {
        page_size: 32,
        current_page: 1
      },
      headers: authHeader()
  }
  ).then((response) => {
    if (response.status === 200) {
      let data = response.data;
      let stadiums = data['stadiums'].map((stadium: any) => { return { id: stadium.id, name: stadium.name } });
      setData(stadiums);
    }
  });

  // let stadiums: Array<Stadium> = Array.from(Array(32).keys()).map((stadiumNumber) => { return { id: stadiumNumber, name: `Stadium ${stadiumNumber}` } })
  // setData(stadiums);
}

function fetchRefs(setData: ReactCallback<Array<string>>) {
  let refs = [
    "Ivan Barton",
    "Chris Beath",
    "Raphael Claus",
    "Matthew Conger",
    "Ismail Elfath",
    "Mario Escobar",
    "Alireza Faghani",
    "Stephanie Frappart",
  ];

  setData(refs);
}

function dropDown(
  currentChoice: string,
  options: Array<string>,
  placeHolder: string,
  width: string,
  changeSelected: ReactCallback<string>,
) {
  return (
    <Box width={width}>
      <TextField
        select
        label={placeHolder}
        value={currentChoice}
        fullWidth
        onChange={(e) => { changeSelected(e.target.value); }
        }
      >
        {options?.map((option, index) => (<MenuItem value={option} key={index}> {option} </MenuItem>))}
      </TextField>
    </Box>
  );
}

function matchDate(date: Date, setDate: ReactCallback<Date>) {
  return (
    <Box width='200px'>
      <DatePicker
        label='Match date'
        renderInput={(params: any) => <TextField {...params} />}
        value={date}
        onChange={(newValue) => { setDate(new Date(newValue!!.toString())); }}
      />
    </Box>
  );
}

function matchTime(date: Date, setTime: ReactCallback<Date>) {
  return (
    <Box width='200px'>
      <TimePicker
        label='Match time'
        renderInput={(params: any) => <TextField {...params} />}
        value={date}
        onChange={(newValue) => { setTime(new Date(newValue!!.toString())); }}
      >
      </TimePicker>
    </Box>
  );
}

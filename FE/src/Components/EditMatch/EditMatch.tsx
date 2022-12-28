import React, { useEffect, useState } from "react";
import { Box, TextField, MenuItem, Button } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useParams } from 'react-router-dom';

import axios from 'axios'
import { authHeader } from "../../auth";

type ReactCallback<T> = React.Dispatch<React.SetStateAction<T>>;

type Stadium = {
  id: number
  name: string
};


let mock = ` {
            "id": 12,
            "team_1": 5,
            "team_2": 4,
            "stadium_name": "Stadium 1",
            "stadium_shape": "square",
            "main_ref": "Ivan Barton",
            "lineman_1": "Chris Beath",
            "lineman_2": "Raphael Claus",
            "no_total_seats": 32000,
            "no_reserved_seats": 21546,
            "no_rows_in_vip": 4,
            "no_seats_per_row": 40,
            "match_date": 975764735,
            "reserved_vip_seats": [
                {
                    "seat_row": 2,
                    "seat_number": [
                        156
                    ]
                },
                {
                    "seat_row": 3,
                    "seat_number": [
                        156
                    ]
                },
                {
                    "seat_row": 14,
                    "seat_number": [
                        1,
                        2,
                        6,
                        16,
                        156
                    ]
                }
            ]
        }`
export default function EditMatch() {

  let { matchId } = useParams();

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
  const [date, setDate] = useState(new Date());

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

  useEffect(() => {
    if(!stadiums || stadiums.length === 0) return;

    axios
      .get(`api/match/${matchId}`, {})
      .then((response) => {
        console.log(response)
        console.log(stadiums)
        if (response.status === 200) {
          let data = response.data;

          let t1Id = data['team_1'];
          let t2Id = data['team_2'];

          let stadium_name: string = data['stadium_name'];
          let stadium_id = stadiums.find((s) => s.name = stadium_name)!.id
          let stadium: Stadium = { id: stadium_id, name: stadium_name };

          let ref: string = data['main_ref'];
          let firstRef: string = data['lineman_1'];
          let secondRef: string = data['lineman_2'];

          let matchDate: Date = new Date(0);
          matchDate.setUTCSeconds(data['match_date']);

          setTeam1(`Team ${t1Id}`);
          setTeam2(`Team ${t2Id}`);

          setStadium(stadium);

          setMainRef(ref);
          setFirstLineRef(firstRef);
          setSecondLineRef(secondRef);

          setDate(matchDate);
        }
      });
  }, [stadiums]);

  useEffect(
    () => {
      let allLoaded = (teams !== null && stadiums !== null && refs !== null)
        && (teams.length > 0 && stadiums.length > 0 && refs.length > 0);

      setIsLoading(!allLoaded);
    },
    [teams, stadiums, refs]
  );

  const clearData = () => {
    setTeam1('');
    setTeam2('');
    setStadium(defaultStadium);

    setMainRef('');
    setFirstLineRef('');
    setSecondLineRef('');
  }

  const enableCreateMatchButton: () => boolean = () => {
    let enable = 
         team1.length > 0
      && team2.length > 0
      && stadium.id >= 0
      && mainRef.length > 0
      && firstLineRef.length > 0
      && secondLineRef.length > 0
      && team1 !== team2
      && mainRef !== firstLineRef
      && mainRef !== secondLineRef
      && firstLineRef !== secondLineRef
      && date.getTime() > Date.now()

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
        <h1 style={{ textAlign: 'center', padding: '20px' }}>Edit Match</h1>


        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 20 }}>
            {dropDown(team1, teams, 'Edit Team 1', '200px', setTeam1)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dropDown(team2, teams, 'Edit Team 2', '200px', setTeam2)}
          </div>
        </div>


        <div style={{ paddingTop: '20px', }}>
          {dropDown(stadium.name, stadiums.map((s) => s.name), 'Edit stadium', '420px', (sName) => setStadium(stadiums.find((s) => s.name === sName)!!))}
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
          {dropDown(mainRef, refs, 'Edit main referee', '420px', setMainRef)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 20 }}>
            {dropDown(firstLineRef, refs, 'Edit first line referee', '200px', setFirstLineRef)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dropDown(secondLineRef, refs, 'Edit second line referee', '200px', setSecondLineRef)}
          </div>
        </div>

        <Button
          onClick={() => createMatchRequest(matchId ?? "", team1, team2, stadium, mainRef, firstLineRef, secondLineRef, date, clearData)}
          style={{ width: '420px', borderRadius: 2 }}
          variant="outlined"
          fullWidth
          disabled={!enableCreateMatchButton()}
        >
          Edit Match
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
  matchId: string,
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

  axios.put(
    `api/match/update/${matchId}`, {
      "team_1": t1,
      "team_2": t2,
      "main_ref": mainRef,
      "lineman_1": firstLineRef,
      "lineman_2": secondLineRef,
      "match_date": time,
      "stadium_id": stadium_id
    },
    {
      headers: authHeader()
    }
  ).then((response) => {
    if (response.status === 200) {
      alert('Match updated successfully');
    } else {
      alert('Error updating match')
    }
  }).catch((e) => {
    alert('Sorry, an error occurred :(');
  });
}


function fetchTeams(setTeams: ReactCallback<Array<string>>) {
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
    "Lyric Hegmann",
    "Dr. Jeremie Huel",
    "Vidal Gottlieb"
  ];

  setData(refs);
}

function dropDown<T>(
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
        label='Edit match date'
        renderInput={(params: any) => <TextField {...params} />}
        value={date}
        onChange={(newValue) => { 
          setDate(new Date(newValue!!.toString())); 
      }}
      />
    </Box>
  );
}

function matchTime(date: Date, setTime: ReactCallback<Date>) {
  return (
    <Box width='200px'>
      <TimePicker
        label='Edit match time'
        renderInput={(params: any) => <TextField {...params} />}
        value={date}
        onChange={(newValue) => { 
          setTime(new Date(newValue!!.toString())); 
        }}
      >
      </TimePicker>
    </Box>
  );
}

import axios from 'axios'
import React, { useEffect, useState } from "react";

import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useParams, useHistory } from 'react-router-dom';

import { authHeader } from "../../auth";
import { areInputsValid, dropDown, fetchRefs, fetchStadiums, fetchTeams, loading, matchDate, matchTime, Stadium } from '../../Common';
import { useSelector } from 'react-redux';

export default function EditMatch() {

  let { matchId } = useParams<{ matchId?: string }>();
  const role = useSelector((state: any) => state.user.userInfo.role);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const accessToken = useSelector((state: any) => state.user.userInfo.accessToken);
  const isVerified = useSelector((state: any) => state.user.userInfo.isVerified);

  const history = useHistory();

  if (!isLoggedIn || !Number.parseInt(matchId!!) || role >= 2 || !isVerified) {
    history.push('/NotFound');
  }

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


  const [errors, setErrors] = useState({
    team1: '',
    team2: '',
    stadium: '',
    mainRef: '',
    firstLineRef: '',
    secondLineRef: '',
  });

  const [validInputs, setValidInputs] = useState(true);

  useEffect(() => {
    if (isLoggedIn && isVerified && role < 2) {
      fetchTeams(setTeams);
      fetchRefs(setRefs);
      fetchStadiums(setStadiums, accessToken);
    }
  }, []);

  useEffect(() => { !validInputs && validateInputs() }, [team1, team2, stadium, mainRef, firstLineRef, secondLineRef]);
  const validateInputs = () => {
    return areInputsValid(errors, team1, team2, firstLineRef, secondLineRef, mainRef, stadium, setErrors, date, setValidInputs);
  }


  useEffect(() => {
    if (!stadiums || stadiums.length === 0) return;

    axios
      .get(`api/match/${matchId}`, {})
      .then((response) => {
        if (response?.status === 200) {
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
      })
      .catch((error) => {
        history.push('/NotFound')
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


  return (
    <div>
      {isLoading && loading()}
      {!isLoading
        && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center'}}>
          <h1 style={{ textAlign: 'center', padding: '20px' }}>Edit Match</h1>


          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
              {dropDown(team1, teams, 'Edit Team 1', '200px', setTeam1, errors.team1)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
              {dropDown(team2, teams, 'Edit Team 2', '200px', setTeam2, errors.team2)}
            </div>
          </div>


          <div style={{ padding: '10px 0', }}>
            {
              dropDown(stadium.name,
                stadiums.map((s) => s.name),
                'Edit stadium',
                '420px',
                (sName) => setStadium(stadiums.find((s) => s.name === sName)!!),
                errors.stadium
              )
            }
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 0'}}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingRight: '10px'
                }}
              >
                {matchDate(date, setDate)}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '10px'
                }}
              >
                {matchTime(date, setDate)}
              </div>
            </div>
          </LocalizationProvider>

          <div style={{ paddingTop: '10px' }}>
            {dropDown(mainRef, refs, 'Edit main referee', '420px', setMainRef, errors.mainRef)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 20 }}>
              {dropDown(firstLineRef, refs, 'Edit first line referee', '200px', setFirstLineRef, errors.firstLineRef)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {dropDown(secondLineRef, refs, 'Edit second line referee', '200px', setSecondLineRef, errors.secondLineRef)}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between', width: '420px'}}>

            <Button
              onClick={() => { history.goBack() }}
              style={{ borderRadius: 2, marginRight: '10px'}}
              variant="contained"
              fullWidth
            >
              Back
            </Button>

            <Button
              onClick={() => editMatchRequest(matchId ?? "", team1, team2, stadium, mainRef, firstLineRef, secondLineRef, date, validateInputs, accessToken)}
              style={{ borderRadius: 2, marginLeft: '10px'}}
              variant="outlined"
              fullWidth
              disabled={!validInputs}
            >
              Apply Edits
            </Button>
          </div>

        </div>
      }
    </div>
  );
}

function editMatchRequest(
  matchId: string,
  team1: string,
  team2: string,
  stadium: Stadium,
  mainRef: string,
  firstLineRef: string,
  secondLineRef: string,
  date: Date,
  validateInputs: () => boolean,
  accessToken: string,
) {

  let valid = validateInputs()
  console.log(valid);
  if(!valid) return;

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
      headers: authHeader(accessToken)
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
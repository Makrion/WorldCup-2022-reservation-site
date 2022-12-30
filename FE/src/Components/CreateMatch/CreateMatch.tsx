import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { authHeader } from "../../auth";
import axios from 'axios'
import { areInputsValid, dropDown, fetchRefs, fetchStadiums, fetchTeams, loading, matchDate, matchTime, Stadium } from "../../Common";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateMatch() {
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const accessToken = useSelector((state: any) => state.user.userInfo.accessToken);
  const isVerified = useSelector((state: any) => state.user.userInfo.isVerified);

  const history = useHistory();

  const role = useSelector((state: any) => state.user.userInfo.role);
  if(!isLoggedIn || role >= 2 || !isVerified) {
    history.push('/NotFound');
  }

  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [stadium, setStadium] = useState(Stadium.default());
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
    if (isLoggedIn && isVerified && role === 1) {
      fetchTeams(setTeams);
      fetchRefs(setRefs);
      fetchStadiums(setStadiums, accessToken);
    }
  }, [accessToken]);

  useEffect(
    () => {
      let allLoaded = (teams !== null && stadiums !== null && refs !== null)
        && (teams.length > 0 && stadiums.length > 0 && refs.length > 0);

      setIsLoading(!allLoaded);
    },
    [teams, stadiums, refs]
  )

  // Only validate inpenuts (and thus show errors)
  // When validInputs is false. 
  // It starts as true and is set to false for the first time when we press `create match`
  // with invalid inputs.
  useEffect(() => { !validInputs && validateInputs() }, [team1, team2, stadium, mainRef, firstLineRef, secondLineRef]);

  const validateInputs = () => {
    return areInputsValid(errors, team1, team2, firstLineRef, secondLineRef, mainRef, stadium, setErrors, date, setValidInputs);
  }


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
            {dropDown(team1, teams, 'Choose Team 1', '200px', setTeam1, errors.team1)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dropDown(team2, teams, 'Choose Team 2', '200px', setTeam2, errors.team2)}
          </div>
        </div>


        <div style={{ paddingTop: '20px', }}>
          {
            dropDown(
              stadium.name,
              stadiums.map((s) => s.name),
              'Choose a stadium!',
              '420px',
              (sName) => setStadium(stadiums.find((s) => s.name === sName)!!),
              errors.stadium
            )
          }

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
          {dropDown(mainRef, refs, 'Main referee!', '420px', setMainRef, errors.mainRef)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 20 }}>
            {dropDown(firstLineRef, refs, 'First line referee', '200px', setFirstLineRef, errors.firstLineRef)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dropDown(secondLineRef, refs, 'Second line referee', '200px', setSecondLineRef, errors.secondLineRef)}
          </div>
        </div>

        <Button
          onClick={() => createMatchRequest(team1, team2, stadium, mainRef, firstLineRef, secondLineRef, date, validateInputs, accessToken)}
          style={{ width: '420px', borderRadius: 2 }}
          variant="outlined"
          fullWidth
          disabled = {!validInputs}
        >
          Create Match
        </Button>

      </div>
      }
    </div>
  );
}

function createMatchRequest(
  team1: string,
  team2: string,
  stadium: Stadium,
  mainRef: string,
  firstLineRef: string,
  secondLineRef: string,
  date: Date,
  validateInputs: () => boolean,
  authToken: string
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
    { headers: authHeader(authToken) }
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
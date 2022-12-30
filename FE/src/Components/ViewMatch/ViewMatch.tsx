import React, { useEffect, useState } from "react";
import axios from 'axios'

import { useParams, useHistory } from 'react-router-dom';
import { Button } from "@mui/material";
import { fetchStadiums, loading, Stadium } from "../../Common";
import { useSelector } from "react-redux";

export default function ViewMatch() {

  let { matchId } = useParams<{matchId?: string}>();
  const history = useHistory();
  const role = useSelector((state: any) => state.user.userInfo.role);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const isVerified = useSelector((state: any) => state.user.userInfo.isVerified);

  if(!Number.parseInt(matchId!!)) {
    history.push('/NotFound');
  }

  const [isLoading, setIsLoading] = useState(true);

  const [team1Name, setTeam1] = useState('');
  const [team2Name, setTeam2] = useState('');
  const [stadium, setStadium] = useState('');
  const [mainRef, setMainRef] = useState('');
  const [firstLineRef, setFirstLineRef] = useState('');
  const [secondLineRef, setSecondLineRef] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios
      .get(`api/match/${matchId}`, {})
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;

          let t1Id = data['team_1'];
          let t2Id = data['team_2'];

          let stadium_name: string = data['stadium_name'];

          let ref: string = data['main_ref'];
          let firstRef: string = data['lineman_1'];
          let secondRef: string = data['lineman_2'];

          let matchDate: Date = new Date(0);
          matchDate.setUTCSeconds(data['match_date']);

          setTeam1(`Team ${t1Id}`);
          setTeam2(`Team ${t2Id}`);

          setStadium(stadium_name);

          setMainRef(ref);
          setFirstLineRef(firstRef);
          setSecondLineRef(secondRef);

          setDate(matchDate);

          setIsLoading(false);
        }
      }).catch((error) => {
        history.push('/NotFound');
      });
  }, [matchId]);


  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {isLoading && loading()}
      {!isLoading && <div>
        <h1 style={{ textAlign: 'center', padding: '20px' }}>Match Details</h1>


        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
              <h4 style={{textAlign:'center', fontWeight: 300}}>Team 1</h4>
              <h2>{team1Name}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', padding: 10}}>
            <h4 style={{textAlign:'center', fontWeight: 300 }}>Team 2</h4>
            <h2>{team2Name}</h2>
          </div>
        </div>


        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', alignItems: 'center' }}>
            <h4 style={{fontWeight: 300}}>Stadium</h4>
            <h2>{stadium}</h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            alignItems: 'center', 
            justifyContent: 'center', 
          }}
        >
          <h4 style={{fontWeight: 300}}>Match Date</h4>
          <h2>{date.toUTCString()}</h2>
        </div>

        <div style={{ display: 'flex', padding: '10px', alignItems: 'center', flexDirection: 'column' }}>
          <h4 style={{fontWeight: 300}}>Main Referee</h4>
          <h2>{mainRef}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', padding: 10, alignContent: 'center'}}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 10, alignItems: 'center'}}>
            <h4 style={{fontWeight: 300}}>First Line Referee</h4>
            <h2>{firstLineRef}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', padding: 10, alignItems: 'center'}}>
            <h4 style={{fontWeight: 300}}>Second Line Referee</h4>
            <h2>{secondLineRef}</h2>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Button
            onClick={() => { history.goBack() }}
            style={{ borderRadius: 2, margin: '5px'}}
            variant="contained"
            fullWidth
          >
            Back
          </Button>

          {
            (isLoggedIn && role === 1 && isVerified)
            &&
            <Button
              onClick={() => { history.push(`/EditMatch/${matchId}`) }}
              style={{ borderRadius: 2, margin: '5px' }}
              variant="outlined"
              fullWidth
            >
              Edit
            </Button>
          }
        </div>

      </div>
      }
    </div>
  );
}
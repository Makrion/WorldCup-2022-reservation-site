import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';
import { Button } from "@mui/material";
import { fetchStadiums, loading, Stadium } from "../../Common";
import { useSelector } from "react-redux";
import { api } from '../../States/api';
import Axios from "axios";

export default function ViewMatch() {

  let { matchId } = useParams<{matchId?: string}>();
  const history = useHistory();
  const role = useSelector((state: any) => state.user.userInfo.role);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const isVerified = useSelector((state: any) => state.user.userInfo.isVerified);
  const accessToken = useSelector((state: any) => state.user.userInfo.accessToken);

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

  const reserveMatch = (id: any, row: any, column: any, type: any) => {
    let body;
    if(type===1){
     body = {
      match_id: id,
      seat: "vip",
      seat_row: row,
      seat_number: column
    }
  }
  else {
     body = {
      match_id: id,
      seat: "norm",
    }
  }
    Axios({
      method: "POST",
      url: `${api}/api/ticket/create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    })
    .then((response) => {
      alert("Reservation was Successful")
    })
    .catch((error) => {
      alert(error.response.data.message);
    })
  }

  useEffect(() => {
    axios
      .get(`api/match/${matchId}`, {})
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          console.log(data)

          let t1Id = data['team_1'];
          let t2Id = data['team_2'];

          let stadium_name: string = data['stadium_name'];

          let ref: string = data['main_ref'];
          let firstRef: string = data['lineman_1'];
          let secondRef: string = data['lineman_2'];

          let matchDate: Date = new Date(0);
          matchDate.setUTCSeconds(data['match_date']);


         // for each set in data.reserved_vip_seats
          //add to the array of special cells
          const specialCells = [];
          for (let i = 0; i < data.reserved_vip_seats.length; i++) {
            let seat = data.reserved_vip_seats[i];
            let seat_row = seat.seat_row - 1;
            for (let j = 0; j < seat.seat_number.length; j++) {
            let seat_col = seat.seat_number[j] - 1 ;

            specialCells.push(seat_row * data.no_seats_per_row + seat_col + 1);
            }
          }
          console.log(data.reserved_vip_seats);
          console.log(specialCells);

          setStadiumInfo({
            rows: data.no_rows_in_vip,
            columns: data.no_seats_per_row,
            special: specialCells
          })

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


  const [stadiumInfo, setStadiumInfo] = useState({
    rows: 1,
    columns: 1,
    special: [1, 2, 3]
  })

    // rewrite the line above for typescript
  const ButtonGrid = ({ rows, columns, specialCellNumbers }: { rows: number, columns: number, specialCellNumbers: number[] }) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const cellNumber = i * columns + j + 1;
        const isSpecial = specialCellNumbers.includes(cellNumber);
        row.push(
          <button
            key={cellNumber}
            style={{
              margin: '0.5em',
              backgroundColor: isSpecial ? '#3f51b5' : 'white',
              color: isSpecial ? 'white' : 'black',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              cursor: isSpecial? '':'pointer',
              border: '3px solid #3f51b5',
            }}
            onClick={() => {
              if(isSpecial) return;
              reserveMatch(matchId, i+1, j+1, 1)
            }}

          >
            {cellNumber}
          </button>
        );
      }
      grid.push(
        <div key={i} style={{ display: 'block'}}>
          {row}
        </div>
      );
  }
  
    return (
      <div style={{ display: 'flex', marginTop: '2rem', marginBottom: '3rem', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{
          marginBottom: '1rem',
          color: '#3f51b5',
        }}> {stadium} VIP Reservations </h1>
        {grid}
        <button 
        onClick={()=>{
          reserveMatch(matchId, 0, 0, 0)
        }}
        style={{
          marginTop: '1rem',
          border: '1px solid #3f51b5',
          borderRadius: '2rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#3f51b5',
          color: 'white',
          cursor: 'pointer'
        }}>Make a Normal Reservation Instead</button>
      </div>
    );
  };


  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {isLoading && loading()}
      {!isLoading && 
      <div style={{
      }}>
      <div>
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
      {(role === 2) && <div>
      <ButtonGrid rows={stadiumInfo.rows} columns={stadiumInfo.columns} specialCellNumbers={stadiumInfo.special} />
      </div>}
      </div>
      }
    </div>
  );
}
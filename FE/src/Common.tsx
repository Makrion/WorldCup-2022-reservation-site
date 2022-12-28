
import axios from 'axios'
import React from "react";

import { Box, TextField, MenuItem} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import { authHeader } from "./auth";

export type ReactCallback<T> = React.Dispatch<React.SetStateAction<T>>;

export type Stadium = {
  id: number
  name: string
};

export function loading() {
  return (
    <h1>
      Loading ...
    </h1>
  )
}

export function fetchTeams(setTeams: ReactCallback<Array<string>>) {
  let teams = Array.from(Array(32).keys()).map((teamNumber) => `Team ${teamNumber}`);
  setTeams(teams);
}

export function fetchStadiums(setData: ReactCallback<Array<Stadium>>) {
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
  }).catch((erroro) => {
    alert("Error connecting to the server :(")
  });
}

export function fetchRefs(setData: ReactCallback<Array<string>>) {
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

export function dropDown(
  currentChoice: string,
  options: Array<string>,
  placeHolder: string,
  width: string,
  changeSelected: ReactCallback<string>,
) {
  return (
    <Box width={width} >
      <TextField
        select
        label={placeHolder}
        value={currentChoice}
        fullWidth
        onChange={(e) => { changeSelected(e.target.value); }
        }
      >
        {options?.map((option, index) => (<MenuItem value={option} key={index} > {option} </MenuItem>))}
      </TextField>
    </Box>
  );
}

export function matchDate(date: Date, setDate: ReactCallback<Date>) {
  return (
    <Box width='200px' >
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

export function matchTime(date: Date, setTime: ReactCallback<Date>) {
  return (
    <Box width='200px' >
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
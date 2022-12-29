
import axios from 'axios'
import React from "react";

import { Box, TextField, MenuItem} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import { authHeader } from "./auth";

export type ReactCallback<T> = React.Dispatch<React.SetStateAction<T>>;
export type CreateMatchErrors = { team1: string; team2: string; stadium: string; mainRef: string; firstLineRef: string; secondLineRef: string; }

// 0 => admin, 1 => manager, 2 => fan.
export const mockRole: number = 1;

export class Stadium {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static default(): Stadium {
    return {
      id: -1,
      name: ''
    };
  }
};


export function loading() {
  return (
    <div style={{padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>

      <h1>
        Loading ...
      </h1>

    </div>
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
  error?: string,
) {
  return (
    <Box width={width} >
      <TextField
        select
        label={placeHolder}
        value={currentChoice}
        fullWidth
        onChange={(e) => { changeSelected(e.target.value); }}
        error={Boolean(error)}
        helperText={error}
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

export function validate<T>(val: T,  fieldName: string, criteria: (t: T) => boolean): string {
  if (!criteria(val)) {
    return `${fieldName} is required.`
  } else {
    return '';
  }
}

export function areInputsValid(
  errors: CreateMatchErrors,
  team1: string,
  team2: string,
  firstLineRef: string,
  secondLineRef: string,
  mainRef: string,
  stadium: Stadium,
  setErrors: ReactCallback<CreateMatchErrors>,
  date: Date,
 setValidInputs: ReactCallback<boolean>
) {
  let newErrors = { ...errors };

  newErrors.team1 = validate(team1, 'Team 1', (t) => t.length > 0);
  newErrors.team2 = validate(team2, 'Team 2', (t) => t.length > 0);
  newErrors.firstLineRef = validate(firstLineRef, 'First line referee', (t) => t.length > 0);
  newErrors.secondLineRef = validate(secondLineRef, 'Second Line referee', (t) => t.length > 0);
  newErrors.mainRef = validate(mainRef, 'Main referee', (t) => t.length > 0);
  newErrors.stadium = validate(stadium, 'Stadium', (t) => t.id > -1);

  if (newErrors.team1.length === 0
    && newErrors.team2.length === 0
    && team1 === team2) {
    newErrors.team1 = newErrors.team2 = 'Team 1 and team 2 must be different.';
  }

  if (newErrors.mainRef.length === 0
    && newErrors.firstLineRef.length === 0
    && newErrors.secondLineRef.length === 0
    && (mainRef === firstLineRef
      || firstLineRef === secondLineRef
      || secondLineRef === mainRef)) {
    newErrors.mainRef = newErrors.firstLineRef = newErrors.secondLineRef = "All referees must be different";
  }

  setErrors(newErrors);

  // Loop over the values in the errors map
  // Check if all errors are empty
  // AND their results all together with `true`.
  // Returns true only if all errors are empty.
  let noErrors =
    Object
      .values(newErrors)
      .map((value) => { return value.length === 0; })
      .reduce((prev, current) => prev && current, true)

  let enable = noErrors && date.getTime() > Date.now();

  setValidInputs(enable);
  return enable;
}

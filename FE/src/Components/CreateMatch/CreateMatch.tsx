import React, { useEffect, useState } from "react";
import { Box, TextField, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


type ReactCallback<T> = React.Dispatch<React.SetStateAction<T>>;

export function CreateMatch() {
    const [isLoading, setIsLoading] = useState(true);

    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [stadium, setStadium] = useState('');
    const [mainRef, setMainRef] = useState('');
    const [firstLineRef, setFirstLineRef] = useState('');
    const [secondLineRef, setSecondLineRef] = useState('');
    const [date, setDate] = useState(new Date());

    const [stadiums, setStadiums] = useState(new Array<string>());
    const [teams, setTeams] = useState(new Array<string>());
    const [refs, setRefs] = useState(new Array<string>());

    useEffect(() => {
        setTimeout(
            () => {
                setTeams(fetchTeams());
                setStadiums(fetchStadiums());
                setRefs(fetchRefs());
                setIsLoading(false);
            },
            5000
        )
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            { isLoading && loading() }
            { !isLoading && <div>
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
                    {dropDown(stadium, stadiums, 'Choose a stadium!', '420px', setStadium)}
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
                        {dropDown(secondLineRef,  refs,'Second line referee', '200px', setSecondLineRef)}
                    </div>
                </div>

                <button
                    onClick={() => createMatchRequest(team1, team2, stadium, mainRef, firstLineRef, secondLineRef, date)}
                    style={{ width: '420px', marginBottom: '20px' }}
                > 
                    Create Match 
                </button>

            </div>
            }
        </div>
    );
}

function loading() {
    return(
        <h1>
            Loading ...
        </h1>
    )
}

function createMatchRequest(
    team1: string,
    team2: string,
    stadium: string,
    mainRef: string,
    firstLineRef: string,
    secondLineRef: string,
    date: Date
) {
    console.log(team1);
    console.log(team2);
    console.log(stadium);
    console.log(mainRef);
    console.log(firstLineRef);
    console.log(secondLineRef);
    console.log(date);
}


function fetchTeams(): Array<string> {
    // TODO: Fetch data from the backend
    return ['Barcalona', 'Real Madrid']
}

function fetchStadiums(): Array<string> {
    // TODO: Fetch data from the backend
    return ['Stadium1', 'Stadium2']
}

function fetchRefs(): Array<string> {
    // TODO: Fetch data from the backend
    return ['Ref1', 'Ref2', 'Ref3'];
}

function dropDown(
    currentChoice: string,
    options: Array<string>,
    placeHolder: string,
    width: string,
    changeSelected: any
) {
    return (
        <Box width={width}>
            <TextField select label={placeHolder} value={currentChoice} fullWidth onChange={(e) => changeSelected(e.target.value)}>
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
                onChange={(newValue) => { setDate(newValue!!); }}
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
                onChange={(newValue) => { setTime(newValue!!); }}
            >
            </TimePicker>
        </Box>
    );
}

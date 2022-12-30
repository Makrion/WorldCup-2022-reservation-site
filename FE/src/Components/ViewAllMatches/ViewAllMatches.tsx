import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "@mui/material";
import { Divider, ListItem, ListItemText } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';
import { loading } from "../../Common";

type MatchJson = { id: string, team_1: string, team_2: string, stadium_name: string, match_date: number };

export class Match {
  id: number;
  team1Id: string;
  team2Id: string;
  stadiumName: string;
  matchDate: Date;

  constructor(id: string, team1: string, team2: string, stadiumName: string, matchDate: number) {
    this.id = Number.parseInt(id)
    this.team1Id = team1
    this.team2Id = team2
    this.stadiumName = stadiumName
    this.matchDate = new Date(0);
    this.matchDate.setUTCSeconds(matchDate);
  }

  static fromJson(json: MatchJson): Match {
    return new Match(json['id'], json['team_1'], json['team_2'], json['stadium_name'], json['match_date']);
  }
};

export default function ViewAllMatches() {
  const [matches, setMatches] = useState(new Array<Match>());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/matches', {
        params: {
          page_size: 32,
          current_page: 1
        }
      })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          let mats = data['matches'].map((match: MatchJson) => Match.fromJson(match))
          setMatches(mats);
          console.log(mats);
          setIsLoading(false);
        }
      })
  }, []);

  const matchList = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Matches</h1>
        <List>
          {
            matches.map((match: Match, index) =>
              <div key={index}>
                <ListItem
                  key={index}
                  style={{ width: '100%', padding: '10px', cursor: 'pointer', color: 'black' }}
                  component={Link}
                  to={`/ViewMatch/${match.id}`}
                >
                  <ListItemText>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h2 style={{ margin: '9px' }}>Team {match.team1Id}</h2>

                      <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 40px', alignItems: 'center' }}>
                        <h1 style={{ fontStyle: 'italic', fontWeight: 200 }}> VS </h1>
                        {/* <div style={{ alignContent: 'left' }}>
                              <h6>{new Date(match.matchDate).toUTCString()}</h6>
                              <h6>@ {match.stadiumName}</h6>
                            </div> */}
                      </div>

                      <h2 style={{ margin: '9px' }}>Team {match.team2Id}</h2>
                    </div>
                  </ListItemText>
                </ListItem><Divider />
              </div>
            )
          }
        </List>
      </div>
    )
  }

  const noMatches = () => {
    return (
      <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <h1>No Matches...</h1>
      </div>
    );
  }

  return (
    <div style={{
      alignContent: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>

      {isLoading && loading()}
      {!isLoading && matches.length > 0? matchList() : noMatches()}

    </div>
  )
}
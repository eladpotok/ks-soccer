import { DB_URL , TOURNAMENT_TABLE  } from './';


export async function saveTeams(tournamentId, teams) {
    const response = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}/teams.json`, {
        method: 'PUT',
        body: JSON.stringify(teams)
    });

    return response.status == 200;
}

export async function getTeamsByTournamentId(tournamentId) {
    const response = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}/teams.json`);
    const data = await response.json();
    const result = [];
    for (const key in data) {
        result.push (  data[key]
        );
    }
    return data;
}

export async function setPlayersInTeam(tournamentId, teamId, players){
    await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}/teams/${teamId}/players.json`,
    {
        method: 'PUT',
        body: JSON.stringify(players)
    });
}
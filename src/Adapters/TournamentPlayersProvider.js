import { getDemo, moveTo } from "../Utils/makeGroups";
import { DB_URL , TOURNAMENT_TABLE  } from './';


export async function seedDemo() {
    
    await fetch(`${DB_URL}/${TOURNAMENT_TABLE}.json`, {
        method: 'DELETE',
    });

    const players =  getDemo();
    const currentDate = new Date();
    const tournamentId = await addTournament(currentDate, currentDate.toLocaleTimeString(), 'Demo' );
    players.forEach( async (player) => {
        if(player !== null)
        {await addPlayerToTournament(player, tournamentId);}
    });

    console.log('DEMO DB SUCCEEDED')
}

export default async function getPlayersFromTournament(tournamentId) {
    const playersFromDb = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}/players.json`);
    const dataToReturn = await playersFromDb.json();
    console.log('data to return' , dataToReturn);
    const players = [];
    for (const key in dataToReturn) {
            players.push(dataToReturn[key]);
    }

    return players;
}

export async function addPlayerToTournament(player, tournamentId) {

    const response = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}/players/${player.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(player)
    });

    return response.status == 200;
};

export async function removePlayerFromTournament(userId, tournamentId) {

    let playerFromDbToRemove = null;
    const playersFromDb = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}/players/${userId}.json`, {
        method: 'DELETE'
    });
};

export async function movePlayerBetweenLevels(playerId, levelType, tournamentId) {
    
    const response = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}/players/${playerId}/forceType.json`, {
        method: 'PUT',
        body: JSON.stringify(levelType)
    });

    return response.status == 200;
};

export async function setPlayerPaid(playerId, tournamentId, tournamentLevel, teamId, paid) {
    const response = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}/teams/${tournamentLevel}/${teamId}/players/${playerId}/paid.json`, {
        method: 'PUT',
        body: JSON.stringify(paid)
    });

    return response.status == 200;
};

export async function deleteTournament(tournamentId) {
    const response = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${tournamentId}.json`, {
        method: 'DELETE',
    });
}

export async function addTournament(date, time, title){
    const id = date.toDateString();
    await fetch(`${DB_URL}/${TOURNAMENT_TABLE}/${id+title}.json`, {
        method: 'PUT',
        body: JSON.stringify({date: date, time: time, id: id, title: title})
    });
    return id+title;
}

export async function getAllTournaments(){
    const playersFromDb = await fetch(`${DB_URL}/${TOURNAMENT_TABLE}.json`);
    const data = await playersFromDb.json();
    
    const result = [];
    for (const key in data) {
        result.push (

            {
                id: key,
                date: new Date(data[key].date),
                time: new Date(data[key].time),
                title: data[key].title,
                teams: data[key].teams
            }

        );
    }
    
    return result;
}

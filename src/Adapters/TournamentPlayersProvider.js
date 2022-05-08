import { getDemo, moveTo } from "../Utils/makeGroups";


export default async function getPlayersInTournament(tournamentId) {

  //  return getDemo();

    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/players.json`);
    const dataToReturn = await playersFromDb.json();

    const players = [];
    for (const key in dataToReturn) {
            players.push(dataToReturn[key]);
    }
    

    return players;
}

export async function addPlayerToTournament(player, tournamentId) {

    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/players/${player.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(player)
    });

    return response.status == 200;
};

export async function lockTournament(tournamentId) {
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/isLocked.json`, {
        method: 'PUT',
        body: JSON.stringify(true)
    });

    return response.status == 200;
};

export async function openTournament(tournamentId) {
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/isLocked.json`, {
        method: 'PUT',
        body: JSON.stringify(false)
    });

    return response.status == 200;
};


export async function setPlayerStars(playerId, stars) {
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players/${playerId}/stars.json`, {
        method: 'PUT',
        body: JSON.stringify(stars)
    });

    return response.status == 200;
};

export async function savePreferenceUser(playerId, preference) {
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players/${playerId}/preference.json`, {
        method: 'PUT',
        body: JSON.stringify(preference)
    });

    return response.status == 200;
};

export async function forcePlayerToMove(playerId, levelType, tournamentId) {
    
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/players/${playerId}/forceType.json`, {
        method: 'PUT',
        body: JSON.stringify(levelType)
    });

    return response.status == 200;
};

export async function setPlayerPaid(playerId, paid, tournamentId) {
    
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/players/${playerId}/paid.json`, {
        method: 'PUT',
        body: JSON.stringify(paid)
    });

    return response.status == 200;
};


export async function removePlayerFromTournament(userId, tournamentId) {

    let playerFromDbToRemove = null;
    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/players/${userId}.json`, {
        method: 'DELETE'
    });
    // const data = await playersFromDb.json();
    // for (const key in data) {
    //     console.log(data[key].name.toLowerCase() , userId)
    //     if(data[key].name.toLowerCase() === userId.toLowerCase() ) {
    //         playerFromDbToRemove = key;
    //         break;
    //     }
    // }

    // const response =  await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/players/${playerFromDbToRemove}.json`, {
    //     method: 'DELETE',
    // });

};

export async function registerNewPlayer(player) {
    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players.json`);
    const data = await playersFromDb.json();
    for (const key in data) {
        if(data[key].name.toLowerCase() === player.name.toLowerCase() ) {
            return Error('user with the same name already exist');
        }
    }
    console.log('resgisterNewPlayer', player);
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players/${player.id}.json`, {
        method: 'PUT',
        body: JSON.stringify({name: player.name, stars: player.stars, id: player.id , preference: player.preference })
    });

    return response.status == 200;
}

export async function editPlayer(playerId, playerName, stars, preference) {
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players/${playerId}.json`, {
        method: 'PUT',
        body: JSON.stringify({name: playerName, stars: stars, preference: preference })
    });

    console.log(response)
    return response.status == 200;
}

export async function login(playerId) {
    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players/${playerId}.json`);
    const data = await playersFromDb.json();
    return data;
}

export async function deleteTournament(tournamentId) {
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}.json`, {
        method: 'DELETE',
    });
}


export async function addTournament(date, time, title){
    const id = date.toDateString();
    await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${id+title}.json`, {
        method: 'PUT',
        body: JSON.stringify({date: date, time: time, id: id, title: title})
    });
}

export async function getAllTournaments(){
    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament.json`);
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


export async function getAllPlayers(){
    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players.json`);
    const data = await playersFromDb.json();

    const result = [];
    for (const key in data) {
        result.push (
            {
                id: data[key].id,
                isAdmin: data[key].isAdmin ? data[key].isAdmin : false,
                name: data[key].name,
                stars: data[key].stars
            }
        );
    }
    return result;
}


export async function getPlayerById(id){
    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players/${id}.json`);
    const data = await playersFromDb.json();
    return data;
}

export async function saveTeams(tournamentId, teams) {
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/teams.json`, {
        method: 'PUT',
        body: JSON.stringify(teams)
    });

    return response.status == 200;
}

export async function getTeams(tournamentId) {
    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/teams.json`);
    const data = await response.json();
    return data;
}

export async function changePlayersInTeam(tournamentId, tournamentLevel, teamId, players){

    await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}/teams/${tournamentLevel}/${teamId}/players.json`,
    {
        method: 'PUT',
        body: JSON.stringify(players)
    });
}
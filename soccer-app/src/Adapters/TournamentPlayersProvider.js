

export default async function getPlayersInTournament(tournamentId) {
    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}.json`);
    const dataToReturn = await playersFromDb.json();
    //console.log('players from db', dataToReturn);

    const players = [];
    for (const key in dataToReturn) {
            players.push(dataToReturn[key]);
    }
    

    return players;
}

export function addPlayerToTournament(player, tournamentId) {
    fetch(`https://ks-soccer-default-rtdb.firebaseio.com/tournament/${tournamentId}.json`, {
        method: 'POST',
        body: JSON.stringify(player)
    });
};

export function removePlayerFromTournament(playerName) {
    const participants = participants.filter(function(value, index, arr){ 
        return value.name !== playerName;
    });

    // fetch(`https://ks-soccer-default-rtdb.firebaseio.com/${tournamentId}.json`, {
    //     method: 'POST',
    //     body: JSON.stringify(player)
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

    const response = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players.json`, {
        method: 'POST',
        body: JSON.stringify(player)
    });

    return response.status == 200;
}

export async function login(playername) {
    const playersFromDb = await fetch(`https://ks-soccer-default-rtdb.firebaseio.com/players.json`);
    const data = await playersFromDb.json();
    for (const key in data) {
        if(data[key].name.toLowerCase() === playername.toLowerCase() ) {
            return data[key];
        }
    }

    return null;
}
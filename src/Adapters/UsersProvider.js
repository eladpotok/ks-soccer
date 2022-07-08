import { DB_URL ,  USER_TABLE } from './';

export async function setUserStars(playerId, stars) {
    const response = await fetch(`${DB_URL}/${USER_TABLE}/${playerId}/stars.json`, {
        method: 'PUT',
        body: JSON.stringify(stars)
    });

    return response.status == 200;
};

export async function login(playerId) {
    const playersFromDb = await fetch(`${DB_URL}/${USER_TABLE}/${playerId}.json`);
    const data = await playersFromDb.json();
    return data;
}

export async function registerNewUser(player) {
    

    
    const playersFromDb = await fetch(`${DB_URL}/${USER_TABLE}.json`);
    const data = await playersFromDb.json();
    for (const key in data) {
        if(data[key].name.toLowerCase() === player.name.toLowerCase() ) {
            return Error('user with the same name already exist');
        }
    }
    const response = await fetch(`${DB_URL}/${USER_TABLE}/${player.id}.json`, {
        method: 'PUT',
        body: JSON.stringify({name: player.name, stars: player.stars, id: player.id , preference: player.preference })
    });

    return response.status == 200;
}

export async function editUser(playerId, playerName, stars, preference) {
    const response = await fetch(`${DB_URL}/${USER_TABLE}/${playerId}.json`, {
        method: 'PUT',
        body: JSON.stringify({name: playerName, stars: stars, preference: preference , id:playerId})
    });

    console.log(response)
    return response.status == 200;
}

export async function getAllUsers(){
    const playersFromDb = await fetch(`${DB_URL}/${USER_TABLE}.json`);
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

export async function getUserById(id){
    const playersFromDb = await fetch(`${DB_URL}/${USER_TABLE}/${id}.json`);
    const data = await playersFromDb.json();
    return data;
}


export  function register(mail, password) {
    return fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYidEAT_gMmc3WwvWZ46N5crdR3M-BMYw', {
        method: 'POST',
        body: JSON.stringify({
            email: mail,
            password: password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function login2(mail, password) {
    return fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYidEAT_gMmc3WwvWZ46N5crdR3M-BMYw', {
        method: 'POST',
        body: JSON.stringify({
            email: mail,
            password: password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function addUserToDb(user) {
    const response = await fetch(`${DB_URL}/${USER_TABLE}/${user.userId}.json`, {
        method: 'PUT',
        body: JSON.stringify(user)
    });
}
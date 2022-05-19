import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import getPlayersFromTournament from "../Adapters/TournamentPlayersProvider";
import { getUserById } from "../Adapters/UsersProvider";
import { auth } from "../firebase";
import { getPlayersByLevels } from "../Utils/commonUtils";

export const PlayersContext = React.createContext({
    players: {},
    getPlayersAccordingToLevel: (levelType) => {},
    setPlayers: (players) => {},
    setPlayersAndOrder: (players) => {},
    setPlayersByLevels: (object) => {},
});


export const PlayersContextProvider = (props) => {
    const [players , setPlayers ] = useState(null);
    const [playersBylevels, setPlayersByLevels] = useState({});

    function setUpdatedPlayers(players) {
        setPlayers(players);
    }

    function setPlayersAndOrder(players) {
        setPlayersByLevels(getPlayersByLevels(players));
    }

    function setPlayersSplit(players) {
        setPlayersByLevels(players);
    }

    function getPlayersAccordingToLevel(levelType) {
        return playersBylevels[levelType];
    }

    useEffect(() => { 
        (async () => { 
            if (!players) {
                const playersInTournament = await getPlayersFromTournament(props.id);
                if(!playersInTournament) {
                    return;
                }
                setUpdatedPlayers(playersInTournament);
                setPlayersAndOrder(playersInTournament);
            }
        })() 
      }, [players])
      
    return <PlayersContext.Provider value={{
        players: players,
        playersByLevel: playersBylevels,
        getPlayersAccordingToLevel: getPlayersAccordingToLevel,
        setPlayers: setUpdatedPlayers,
        setPlayersAndOrder: setPlayersAndOrder,
        setPlayersByLevels: setPlayersSplit,
        
    }}>
        {props.children}    
    </PlayersContext.Provider>
};


import React, { useEffect, useState } from "react";
import getPlayersFromTournament from "../Adapters/TournamentPlayersProvider";

export const PlayersContext = React.createContext({
    players: {},
    setPlayers: (players) => {},
});


export const PlayersContextProvider = (props) => {
    const [players , setPlayers ] = useState(null);

    function setUpdatedPlayers(players) {
        setPlayers(players);
    }

    useEffect(() => { 
        (async () => { 
            if (!players) {
                const playersInTournament = await getPlayersFromTournament(props.id);
                if(!playersInTournament) {
                    return;
                }
                setUpdatedPlayers(playersInTournament);
            }
        })() 
      }, [players])
      
    return <PlayersContext.Provider value={{
        players: players,
        setPlayers: setUpdatedPlayers,
    }}>
        {props.children}    
    </PlayersContext.Provider>
};


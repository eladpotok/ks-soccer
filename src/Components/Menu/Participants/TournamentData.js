import Card from "../../UI/Card";
import ParticipantsList from "./ParticipantsList";
import './TournamentData.css'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Store/UserContext";
import { getDemo, makeGroups } from "../../../Utils/makeGroups";
import { MainPageContext, SCREENS } from "../../../Store/MainPageContext";
import getPlayersInTournament, { addPlayerToTournament, removePlayerFromTournament, saveTeams } from "../../../Adapters/TournamentPlayersProvider";

const BUTTON_TYPE = {
    leave: 'leave',
    join: 'join'
}

function TournamentData(props) { 
    
    const mainPageScreenContext = useContext(MainPageContext);
    const userContext = useContext(UserContext);
    const [players, setPlayers] = useState([]);
    const [buttonType, setButtonType] = useState('');

    async function updatePlayers() {
        const playersInTournament =  await getPlayersInTournament(props.id);
        setPlayers(playersInTournament);
        setButtonType(getButtonType(playersInTournament, userContext.user.username));
    }

    useEffect(() => {
        if (!players || players.length === 0) {
            updatePlayers();
        }
      }, [players]);


    function getButtonToShow() {
        if(buttonType === BUTTON_TYPE.join) {
            return <button onClick={joinTournamentHandler} className="participants-join-button">Join!</button>;
        }
        else if(buttonType === BUTTON_TYPE.leave) {
            return <button onClick={leaveTournamentHandler} className="participants-leave-button">Leave</button>;
        }
        return <div/>
    }

    const joinTournamentHandler = async () => {
        setButtonType('');
        const isSucceeded = await addPlayer(players.length+1, userContext.user, props.id);
        if(isSucceeded) {
            const playersFromDb = await getPlayersInTournament(props.id);
            setPlayers(playersFromDb);
            setButtonType(BUTTON_TYPE.leave);
        }
    };

    const leaveTournamentHandler = async () => {
        await removePlayerFromTournament(userContext.user.username, props.id);
        updatePlayers();
    };

    async function playerRemovedHandler(playerName) {
        await removePlayerFromTournament(playerName, props.id)
        updatePlayers();
    }

    async function createTeams() {
        const teams = makeGroups(getDemo());
        await saveTeams(props.id, teams);
        mainPageScreenContext.onScreenChanged({screen: SCREENS.Teams, data: teams});
    }

    return (
        <Card className='table'>
            {players && <ParticipantsList allowRemove={true} players={players} onPlayerRemoved={playerRemovedHandler}/> }
            <div className='footer'>
                <div>
                    <div>Number of Players: &nbsp;&nbsp;   {players.length}/20</div>
                </div>
                <div>
                    {getButtonToShow()}
                    {userContext.user.isAdmin && <button onClick={createTeams} className="participants-lock-button">Create Teams</button>}
                </div>
           </div>
        </Card>
    );

}

function isCurrentUserJoined(players, currentUsername) {
    if(!players) {
        return false;
    }
    return players.some( player => player.name === currentUsername);
}

async function addPlayer(players, user, id) {
    const status = await addPlayerToTournament({
        id: players.length+1,
        name: user.username,
        stars: user.level
    }, id);
    return status;
}

function getButtonType(players, username) {
    if(isCurrentUserJoined(players, username)) {
        return BUTTON_TYPE.leave;
    }
    else {
        return BUTTON_TYPE.join;
    }
}


export default TournamentData;
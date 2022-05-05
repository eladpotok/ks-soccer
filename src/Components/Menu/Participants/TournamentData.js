import Card from "../../UI/Card";
import ParticipantsList, { TournamentDataMobileView } from "./ParticipantsList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Store/UserContext";
import { getDemo, makeGroups } from "../../../Utils/makeGroups";
import { MainPageContext, SCREENS } from "../../../Store/MainPageContext";
import getPlayersInTournament, { addPlayerToTournament, removePlayerFromTournament, saveTeams } from "../../../Adapters/TournamentPlayersProvider";
import './TournamentData.css'
import { BrowserView, MobileView } from "react-device-detect";

const BUTTON_TYPE = {
    leave: 'leave',
    join: 'join'
}

function TournamentData(props) {

    const mainPageScreenContext = useContext(MainPageContext);
    const userContext = useContext(UserContext);
    const [players, setPlayers] = useState(null);
    const [buttonType, setButtonType] = useState('');
    const [isLoading, setLoading] = useState(false);


    async function updatePlayers() {
        setLoading(true);
        const playersInTournament = await getPlayersInTournament(props.id);
        setPlayers(playersInTournament);
        setButtonType(getButtonType(playersInTournament, userContext.user.username));
        setLoading(false);
    }

    useEffect(() => {
        if (!players) {
            updatePlayers();
        }
    }, [players]);


    function getButtonToShow() {
        if (buttonType === BUTTON_TYPE.join) {
            return <button onClick={joinTournamentHandler} className="participants-join-button">Join!</button>;
        }
        else if (buttonType === BUTTON_TYPE.leave) {
            return <button onClick={leaveTournamentHandler} className="participants-leave-button">Leave</button>;
        }
        return <div />
    }

    const joinTournamentHandler = async () => {
        setButtonType('');
        const isSucceeded = await addPlayer(players.length + 1, userContext.user, props.id);
        if (isSucceeded) {
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
        const teams = makeGroups(players);
        await saveTeams(props.id, teams);
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.Teams, data: teams });
    }

    function playersLength() {
        return players?.length ?? 0;
    }

    return (
        <>
            <BrowserView className='tournamentData'>
                <Card className='table'>
                    {players && <ParticipantsList isLoading={isLoading} allowRemove={true} players={players} onPlayerRemoved={playerRemovedHandler} />}

                    <div className='footer'>
                        <div>
                            <div>Number of Players: &nbsp;&nbsp;   {playersLength()}/20</div>
                        </div>
                        <div>
                            {getButtonToShow()}
                            {userContext.user.isAdmin && <button onClick={createTeams} className="participants-lock-button">Create Teams</button>}
                        </div>
                    </div>
                </Card>
            </BrowserView>
            <MobileView style={{ margin: '10px' }}>
                <Card >
                    {players && <TournamentDataMobileView allowRemove={true} players={players} onPlayerRemoved={playerRemovedHandler} />}
                    <div className='footer'>
                        <div>
                            <div style={{ marginTop: '5px' }}>Players {playersLength()}/20</div>
                        </div>
                        <div>
                            {getButtonToShow()}
                            {userContext.user.isAdmin && <button onClick={createTeams} className="participants-lock-button">Create Teams</button>}
                        </div>
                    </div>
                </Card>
            </MobileView>
        </>

    )
}


function isCurrentUserJoined(players, currentUsername) {
    if (!players) {
        return false;
    }
    return players.some(player => player.name === currentUsername);
}

async function addPlayer(players, user, id) {
    const status = await addPlayerToTournament({
        id: players.length + 1,
        name: user.username,
        stars: user.level
    }, id);
    return status;
}

function getButtonType(players, username) {
    if (isCurrentUserJoined(players, username)) {
        return BUTTON_TYPE.leave;
    }
    else {
        return BUTTON_TYPE.join;
    }
}


export default TournamentData;
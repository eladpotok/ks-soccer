import ParticipantsList, { TournamentDataMobileView } from "./ParticipantsList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Store/UserContext";
import { getDemo, GROUP_TYPE, makeGroups } from "../../../Utils/makeGroups";
import { MainPageContext, SCREENS } from "../../../Store/MainPageContext";
import getPlayersFromTournament, { addPlayerToTournament, movePlayerBetweenLevels, removePlayerFromTournament, setPlayerPaid } from "../../../Adapters/TournamentPlayersProvider";
import './TournamentData.css'
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { checkIsAdmin, getPlayersByLevels, sortAscending } from "../../../Utils/commonUtils";
import { AiOutlineSortAscending  } from 'react-icons/ai';
import { BsSortNumericDownAlt } from 'react-icons/bs';
import AddingTempPlayer from "../../Admin/AddingTempPlayer";
import { saveTeams } from "../../../Adapters/TournamentTeamsProvider";
import {  useNavigate } from "react-router-dom";
import { Card } from "antd";
import AdminWrapper from "../../UI/AdminWrapper";
import { PlayersContext } from "../../../Store/PlayersContext";

const BUTTON_TYPE = {
    leave: 'leave',
    join: 'join'
}

function TournamentData(props) {
    const userContext = useContext(UserContext);
    const playersContext = useContext(PlayersContext);
    
    const navigate = useNavigate();
    
    const [buttonType, setButtonType] = useState('');
    const [isLoading, setLoading] = useState(false);

    async function updatePlayers() {
        console.log('tournament id ', props.id)
        const playersInTournament = await getPlayersFromTournament(props.id);
        if(!playersInTournament) {
            return;
        }
        playersContext.setPlayers(playersInTournament);
        console.log('before set player and order', playersInTournament);
        playersContext.setPlayersAndOrder(playersInTournament);
        setButtonType(getButtonType(playersInTournament, userContext.user.username));
        setLoading(false);
    }

    useEffect(() => {
        if (!playersContext.players) {
            updatePlayers();
        }
    }, [playersContext.players]);


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
        setLoading(true);
        setButtonType('');
        const isSucceeded = await addPlayer(userContext.user.id, userContext.user, props.id);
        if (isSucceeded) {
            const playersFromDb = await getPlayersFromTournament(props.id);
            playersContext.setPlayers(playersFromDb);
            playersContext.setPlayersAndOrder(playersFromDb);
            setButtonType(BUTTON_TYPE.leave);
        }
        setLoading(false);
    };

    const leaveTournamentHandler = async () => {
        setLoading(true);
        await removePlayerFromTournament(userContext.user.id, props.id);
        updatePlayers();
        setLoading(false);
    };

    async function playerRemovedHandler(playerName) {
        
        await removePlayerFromTournament(playerName, props.id)
        updatePlayers();
    }

    async function createTeams() {
        const teamsHigh = makeGroups(playersContext.playersByLevel.highLevel, GROUP_TYPE.high);
        const teamsLow = makeGroups(playersContext.playersByLevel.lowLevel, GROUP_TYPE.low);
        await saveTeams(props.id, { teamsLow, teamsHigh });
        //mainPageScreenContext.onScreenChanged({ screen: SCREENS.Teams, data: { teamsLow, teamsHigh , tournamentId: props.id } });
        navigate(`/tournaments/${props.id}/teams`)
    }


    async function addToAnotherLevelHandler(playerId, levelType) {
        await movePlayerBetweenLevels(playerId, levelType, props.id);
        updatePlayers();
    }



    const tempPlayerAddedHandler = async (uid, tempPlayerName, tempPlayerStars, preference) => {
        setLoading(true);
        const isSucceeded = await addPlayer(uid, { id: uid, username: tempPlayerName, level: tempPlayerStars, preference: preference}, props.id);
        if (isSucceeded) {
            const playersFromDb = await getPlayersFromTournament(props.id);
            playersContext.setPlayers(playersFromDb);
            playersContext.setPlayersAndOrder(playersFromDb);
        }

        setLoading(false);
    };



    const cardContainerClasses = isMobile ? 'players-list-container-mobile' : 'players-list-container';
    // const cardClasses = isMobile ? 'players-list-card-mobile' : 'players-list-card';

    return (
        <>
            <div style={{
                position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'
            }}>
                <div className={cardContainerClasses}>

                    <div style={{width: '400px', minHeight: '400px', margin: '20px'}}>
                        {playersContext.players && <ParticipantsList  color='#ffeb78' isLoading={isLoading} allowRemove={true} players={playersContext.playersByLevel.lowLevel} onMovePlayer={(playerId) => { addToAnotherLevelHandler(playerId, GROUP_TYPE.high) }} onPlayerRemoved={playerRemovedHandler} levelType={GROUP_TYPE.low} />}
                        <AdminWrapper>
                            <AddingTempPlayer  tournamentId={props.id} onPlayerAdded={(uid, tempPlayerName, tempPlayerStars) => tempPlayerAddedHandler(uid, tempPlayerName, tempPlayerStars, 'low')}/>
                        </AdminWrapper>
                    </div>
                    <div style={{width: '400px',minHeight: '400px', margin: '20px'}}>
                        {playersContext.players && <ParticipantsList color='#ffeb78' isLoading={isLoading} allowRemove={true} players={playersContext.playersByLevel.highLevel} onMovePlayer={(playerId) => { addToAnotherLevelHandler(playerId, GROUP_TYPE.low) }} onPlayerRemoved={playerRemovedHandler} levelType={GROUP_TYPE.high} />}
                        <AdminWrapper>
                            <AddingTempPlayer  tournamentId={props.id} onPlayerAdded={(uid, tempPlayerName, tempPlayerStars) => tempPlayerAddedHandler(uid, tempPlayerName, tempPlayerStars, 'high')}/>
                        </AdminWrapper>
                    </div>
                </div>
                <Card className='footer-card'>
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <div >{getButtonToShow()}</div>
                        <div >{checkIsAdmin(userContext.user.isAdmin) && <button onClick={createTeams} className='participants-lock-button'>Create Teams</button>}</div>
        
                    </div>
                </Card>
            </div>
        </>
    )
}

function getPlayersLengthByLevel(level, playersBylevels) {
    return level === 'low' ? getPlayersLength(playersBylevels.lowLevel) : getPlayersLength(playersBylevels.highLevel);

}

function getPlayersLength(players) {
    return players?.length ?? 0;
}

function getNumberOfPlayersLabel(levelType, playersBylevels) {
    const number = getPlayersLengthByLevel(levelType, playersBylevels);
    if (number === 0) {
        return (<div style={{ color: 'white', display: 'flex', alignItems: 'center', }}>No Players Yet</div>)
    }

    return (<div style={{ color: 'white' }}>Number of Players: &nbsp;&nbsp;   {number}/20</div>)

}


function isCurrentUserJoined(players, currentUsername) {
    if (!players) {
        return false;
    }
    return players.some(player => player.name === currentUsername);
}

async function addPlayer(userId, user, id) {
    const status = await addPlayerToTournament({
        id: userId,
        name: user.username,
        stars: user.level,
        preference: user.preference
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
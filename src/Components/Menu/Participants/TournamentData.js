import Card from "../../UI/Card";
import ParticipantsList, { TournamentDataMobileView } from "./ParticipantsList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Store/UserContext";
import { getDemo, GROUP_TYPE, makeGroups } from "../../../Utils/makeGroups";
import { MainPageContext, SCREENS } from "../../../Store/MainPageContext";
import getPlayersInTournament, { addPlayerToTournament, forcePlayerToMove, removePlayerFromTournament, saveTeams, setPlayerPaid } from "../../../Adapters/TournamentPlayersProvider";
import './TournamentData.css'
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { checkIsAdmin, getPlayersByLevels, sortAscending } from "../../../Utils/commonUtils";
import { AiOutlineSortAscending  } from 'react-icons/ai';
import { BsSortNumericDownAlt } from 'react-icons/bs';
import AddingTempPlayer from "../../Admin/AddingTempPlayer";

const BUTTON_TYPE = {
    leave: 'leave',
    join: 'join'
}

function TournamentData(props) {

    const mainPageScreenContext = useContext(MainPageContext);
    const userContext = useContext(UserContext);
    const [players, setPlayers] = useState(null);
    const [playersBylevels, setPlayersByLevels] = useState({});
    const [buttonType, setButtonType] = useState('');
    const [isLoading, setLoading] = useState(false);




    async function updatePlayers() {
        setLoading(true);
        const playersInTournament = await getPlayersInTournament(props.id);
        setPlayers(playersInTournament);
        setPlayersByLevels(getPlayersByLevels(playersInTournament));
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
        setLoading(true);
        setButtonType('');
        const isSucceeded = await addPlayer(userContext.user.id, userContext.user, props.id);
        if (isSucceeded) {
            const playersFromDb = await getPlayersInTournament(props.id);
            setPlayers(playersFromDb);
            setPlayersByLevels(getPlayersByLevels(playersFromDb));
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
        const teamsHigh = makeGroups(playersBylevels.highLevel, GROUP_TYPE.high);
        const teamsLow = makeGroups(playersBylevels.lowLevel, GROUP_TYPE.low);
        await saveTeams(props.id, { teamsLow, teamsHigh });
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.Teams, data: { teamsLow, teamsHigh , tournamentId: props.id } });
    }


    async function addToAnotherLevelHandler(playerId, levelType) {
        await forcePlayerToMove(playerId, levelType, props.id);
        updatePlayers();
    }


    const sortbyStars = () => {
        playersBylevels.lowLevel.sort(function (a, b) { return b.stars - a.stars });
        playersBylevels.highLevel.sort(function (a, b) { return b.stars - a.stars });
        setPlayersByLevels({ lowLevel: playersBylevels.lowLevel, highLevel: playersBylevels.highLevel });
    };

    const sortbyAB = () => {
        console.log(players)
        playersBylevels.lowLevel.sort(function (a, b) { return a.name.localeCompare(b.name) });
        playersBylevels.highLevel.sort(function (a, b) { return a.name.localeCompare(b.name) });
        setPlayersByLevels({ lowLevel: playersBylevels.lowLevel, highLevel: playersBylevels.highLevel });
    };

    const tempPlayerAddedHandler = async (uid, tempPlayerName, tempPlayerStars, preference) => {
        setLoading(true);
        const isSucceeded = await addPlayer(uid, { id: uid, username: tempPlayerName, level: tempPlayerStars, preference: preference}, props.id);
        if (isSucceeded) {
            const playersFromDb = await getPlayersInTournament(props.id);
            setPlayers(playersFromDb);
            setPlayersByLevels(getPlayersByLevels(playersFromDb));
        }

        setLoading(false);
    };

    const cardContainerClasses = isMobile ? 'players-list-container-mobile' : 'players-list-container';
    const cardClasses = isMobile ? 'players-list-card-mobile' : 'players-list-card';

    return (
        <>
            <div style={{
                position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'
            }}>
                <div className={cardContainerClasses}>

                    <Card className={cardClasses}>
                        <div className='tournament-data-title'>????????????</div>
                        {players && <ParticipantsList  color='#ffeb78' isLoading={isLoading} allowRemove={true} players={playersBylevels.lowLevel} onMovePlayer={(playerId) => { addToAnotherLevelHandler(playerId, GROUP_TYPE.high) }} onPlayerRemoved={playerRemovedHandler} levelType={GROUP_TYPE.high} />}
                        {checkIsAdmin(userContext.user.isAdmin) && <AddingTempPlayer tournamentId={props.id} onPlayerAdded={(uid, tempPlayerName, tempPlayerStars) => tempPlayerAddedHandler(uid, tempPlayerName, tempPlayerStars, 'low')}/>}
                        <div>{getNumberOfPlayersLabel('low', playersBylevels)}</div>
                    </Card>
                    <Card className={cardClasses}>
                        <div className='tournament-data-title'>????????????</div>
                        {players && <ParticipantsList  color='#ffeb78' isLoading={isLoading} allowRemove={true} players={playersBylevels.highLevel} onMovePlayer={(playerId) => { addToAnotherLevelHandler(playerId, GROUP_TYPE.low) }} onPlayerRemoved={playerRemovedHandler} levelType={GROUP_TYPE.low} />}
                        {checkIsAdmin(userContext.user.isAdmin) && <AddingTempPlayer tournamentId={props.id} onPlayerAdded={(uid, tempPlayerName, tempPlayerStars) => tempPlayerAddedHandler(uid, tempPlayerName, tempPlayerStars, 'high')}/>}
                        <div>{getNumberOfPlayersLabel('high', playersBylevels)}</div>
                    </Card>
                </div>
                <Card className='footer-card'>
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <div >{getButtonToShow()}</div>
                        <div >{checkIsAdmin(userContext.user.isAdmin) && <button onClick={createTeams} className='participants-lock-button'>Create Teams</button>}</div>
                        <div>
                            <button onClick={sortbyAB} className='participants-sort-button'><AiOutlineSortAscending /></button>
                            <button onClick={sortbyStars} className='participants-sort-button'><BsSortNumericDownAlt /></button>
                            <label className="footer-card-divider"></label>
                        </div>
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
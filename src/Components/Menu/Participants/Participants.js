import Card from "../../UI/Card";
import ParticipantsList from "./ParticipantsList";
import './Participants.css'
import getPlayersInTournament, { addPlayerToTournament, getTeams, lockTournament, openTournament, removePlayerFromTournament } from "../../../Adapters/TournamentPlayersProvider";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Store/UserContext";
import { getDemo, makeGroups } from "../../../Utils/makeGroups";

function Participants(props) { 


  

    const [playersReceived, setPlayersReceived] = useState('');
    const [shouldShowJoinButton, setShouldShowJoinButton] = useState(true);
    const [canLeaveOrJoin, setCanLeaveOrJoin ] = useState(false);
    const [isLocked, setLocked ] = useState(props.isLocked);
    const userContext = useContext(UserContext);

    // const teams = getTeams(props.id);
    // if(teams) {
    //     console.log('aaaaaaaaaaaaaa', teams)
    //     props.onShowTeams(teams,props.id)
    // }

    const getPlayersAsync = async () => {
        const playersFromDb = await getPlayersInTournament(props.id);
        setPlayersReceived(playersFromDb);
    };

    useEffect(() => {
        if (!playersReceived) {
            getPlayersAsync();
        }
      }, [playersReceived, getPlayersAsync]);


    function isAlreadyJoined() {
        return playersReceived.some( player => player.name === userContext.user.username);
    }

    useEffect( ()=>{
        if (!userContext.isAuthorized) {
            setCanLeaveOrJoin(false);
            return;
        }
        setCanLeaveOrJoin(true);
        if(playersReceived) setShouldShowJoinButton(!isAlreadyJoined() && userContext.isAuthorized);
        
    }, [playersReceived] );

    const joinToTournamentHandler = async () => {
        await addPlayerToTournament({
            id: playersReceived.length+1,
            name: userContext.user.username,
            stars: userContext.user.level
        }, props.id);

        const playersFromDb = await getPlayersInTournament(props.id);
        setPlayersReceived(playersFromDb);
    };

    const leaveToTournamentHandler = async () => {
        await removePlayerFromTournament(userContext.user.username, props.id);

        const playersFromDb = await getPlayersInTournament(props.id);
        setPlayersReceived(playersFromDb);
    };

    async function playerRemovedHandler(playerName) {
        await removePlayerFromTournament(playerName, props.id)
        const playersFromDb = await getPlayersInTournament(props.id);
        setPlayersReceived(playersFromDb);
    }

    async function lockTournamentHandler () {
        const isSuceeded = await lockTournament(props.id);
        if(isSuceeded) {
            setLocked(true);
        }
    }

    async function openTournamentHandler () {
        const isSuceeded = await openTournament(props.id);
        if(isSuceeded) {
            setLocked(false);
        }
    }

    
    function createTeams() {
        const teams = makeGroups(getDemo());
        props.onShowTeams(teams,props.id);
    }

    return (
        <Card className='table'>
            {playersReceived && <ParticipantsList allowRemove={true} players={playersReceived} onPlayerRemoved={playerRemovedHandler}/> }
            <div className='footer'>
                <div>
                    <div>Number of Players: &nbsp;&nbsp;   {playersReceived.length}/20</div>
                </div>
                {canLeaveOrJoin && <div>
                    {!isLocked && shouldShowJoinButton && <button onClick={joinToTournamentHandler} className="participants-join-button">Join!</button>}
                    {!shouldShowJoinButton && <button onClick={leaveToTournamentHandler} className="participants-leave-button">Leave</button>}
                    {!isLocked && userContext.user.isAdmin && <button onClick={lockTournamentHandler} className="participants-lock-button">Lock</button>}
                    {isLocked && userContext.user.isAdmin && <button onClick={openTournamentHandler} className="participants-lock-button">Open</button>}
                    {userContext.user.isAdmin && <button onClick={createTeams} className="participants-lock-button">Create Teams</button>}
                </div>}
           </div>
        </Card>
    );

}



export default Participants;
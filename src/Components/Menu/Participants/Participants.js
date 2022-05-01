import Card from "../../UI/Card";
import ParticipantsList from "./ParticipantsList";
import './Participants.css'
import getPlayersInTournament, { addPlayerToTournament, lockTournament, openTournament, removePlayerFromTournament } from "../../../Adapters/TournamentPlayersProvider";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Store/UserContext";

function Participants(props) { 

    const [playersReceived, setPlayersReceived] = useState('');
    const [shouldShowJoinButton, setShouldShowJoinButton] = useState(true);
    const [canLeaveOrJoin, setCanLeaveOrJoin ] = useState(false);
    const [isLocked, setLocked ] = useState(props.isLocked);
    const userContext = useContext(UserContext);



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

    return (
        <Card className='table'>
            {playersReceived && <ParticipantsList players={playersReceived} onPlayerRemoved={playerRemovedHandler}/> }
            <div className='footer'>
                <div>
                    <div>Number of Players: &nbsp;&nbsp;   {playersReceived.length}/20</div>
                </div>
                {canLeaveOrJoin && <div>
                    {!isLocked && shouldShowJoinButton && <button onClick={joinToTournamentHandler} className="participants-join-button">Join!</button>}
                    {!shouldShowJoinButton && <button onClick={leaveToTournamentHandler} className="participants-leave-button">Leave</button>}
                    {!isLocked && userContext.user.isAdmin && <button onClick={lockTournamentHandler} className="participants-lock-button">Lock</button>}
                    {isLocked && userContext.user.isAdmin && <button onClick={openTournamentHandler} className="participants-lock-button">Open</button>}
                </div>}
           </div>
        </Card>
    );

}



export default Participants;
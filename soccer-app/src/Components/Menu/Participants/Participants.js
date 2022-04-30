import Card from "../../UI/Card";
import ParticipantsList from "./ParticipantsList";
import './Participants.css'
import getPlayersInTournament, { addPlayerToTournament, removePlayerFromTournament } from "../../../Adapters/TournamentPlayersProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Store/UserContext";

function Participants(props) { 

    const [playersReceived, setPlayersReceived] = useState('');
    const [refreshState, setRefreshState] = useState(false);

    const userContext = useContext(UserContext);


    useEffect(() => {
        if (!playersReceived) {
            getPlayersAsync();
        }
      }, [playersReceived]);

    const getPlayersAsync = async () => {
        const playersFromDb = await getPlayersInTournament(props.id);
        setPlayersReceived(playersFromDb);
    };

    let [shouldShowJoinButton, setShouldShowJoinButton] = useState(true);
    function isAlreadyJoined() {
        return playersReceived.some( player => player.name === userContext.user.username);
    }

    useEffect( ()=>{
        if(playersReceived) setShouldShowJoinButton(!isAlreadyJoined() && userContext.isAuthorized);
        
    }, [playersReceived] );

    const joinToTournamentHandler = () => {
        addPlayerToTournament({
            id: playersReceived.length+1,
            name: userContext.user.username,
            stars: userContext.user.level
        }, props.id);

        setPlayersReceived('');
    };

    const leaveToTournamentHandler = () => {
        removePlayerFromTournament(userContext.user.username);

        setPlayersReceived('');
    };

    return (
        <Card className='table'>
            {refreshState}
            {playersReceived && <ParticipantsList players={playersReceived} /> }
            <div className='footer'>
                <div>
                    <div>Number of Players: &nbsp;&nbsp;   {playersReceived.length}/20</div>
                </div>
                {shouldShowJoinButton && <button onClick={joinToTournamentHandler} className="participants-join-button">Join!</button>}
                {!shouldShowJoinButton && <button onClick={leaveToTournamentHandler} className="participants-leave-button">Leave</button>}
           </div>
        </Card>
    );

}



export default Participants;
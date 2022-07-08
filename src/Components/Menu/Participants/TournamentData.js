import ParticipantsList, { TournamentDataMobileView } from "./ParticipantsList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Store/UserContext";
import { GROUP_TYPE, makeGroups } from "../../../Utils/makeGroups";
import getPlayersFromTournament, { addPlayerToTournament, movePlayerBetweenLevels, setPlayersInTournament, setPlayerPaid } from "../../../Adapters/TournamentPlayersProvider";
import './TournamentData.css'
import { isMobile } from "react-device-detect";
import { checkIsAdmin} from "../../../Utils/commonUtils";
import AddingTempPlayer from "../../Admin/AddingTempPlayer";
import { saveTeams } from "../../../Adapters/TournamentTeamsProvider";
import {  useNavigate } from "react-router-dom";
import { Card, Popconfirm } from "antd";
import AdminWrapper from "../../UI/AdminWrapper";
import { PlayersContext } from "../../../Store/PlayersContext";
import LoadingComponent from "../../UI/LoadingComponent";

const BUTTON_TYPE = {
    leave: 'leave',
    join: 'join'
}

function TournamentData(props) {
    const userContext = useContext(UserContext);
    const playersContext = useContext(PlayersContext);
    
    const [isUserJoined, setUserJoined] = useState(false);
    const [isLoading, setLoading ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (playersContext.players) {
            setUserJoined(checkUserJoined(userContext.user.userId, playersContext.players));
        }
        setLoading(false);
    }, [playersContext.players]);

    function checkUserJoined(userId, players) {
        return players.some( pl => pl.userId === userId);
    }

    const joinTournamentHandler = async () => {
        setLoading(true);
        const playerToAdd = getPlayerOfCurrentUser(userContext.user, props.id);
        const playersListToSet = playersContext.players.concat([playerToAdd]);
        const isSucceeded = await setPlayersInTournament(playersListToSet, props.id);
        if (isSucceeded) {
            playersContext.setPlayers(null);
        }
        setLoading(false);
    };

    const leaveTournamentHandler = async (playerId) => {
        setLoading(true);
        const isSucceeded = await setPlayersInTournament(playersContext.players.filter(t=> t.userId !== playerId), props.id);
        if(isSucceeded) {
            playersContext.setPlayers(null);
        }
        setLoading(false);
    };

    async function createTeams() {
        console.log('players', playersContext.players);
        const teams = makeGroups(playersContext.players);
        console.log('players for teams', teams);
        await saveTeams(props.id, teams);
        navigate(`/tournaments/${props.id}/teams`)
    }



    // const tempPlayerAddedHandler = async (uid, tempPlayerName, tempPlayerStars, preference) => {
    //     setLoading(true);
    //     const isSucceeded = await addPlayer(uid, { id: uid, username: tempPlayerName, level: tempPlayerStars, preference: preference}, props.id);
    //     if (isSucceeded) {
    //         const playersFromDb = await getPlayersFromTournament(props.id);
    //         playersContext.setPlayers(playersFromDb);
    //         playersContext.setPlayersAndOrder(playersFromDb);
    //     }

    //     setLoading(false);
    // };

    const cardContainerClasses = isMobile ? 'players-list-container-mobile' : 'players-list-container';

    return (
        <LoadingComponent isLoading={isLoading}>
            <div style={{
                position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'
            }}>
                <div className={cardContainerClasses}>

                    <div style={{width: '400px', minHeight: '400px', margin: '20px'}}>
                        {playersContext.players && <ParticipantsList  color='#ffeb78'  allowRemove={true}  onPlayerRemoved={leaveTournamentHandler}/>}
                        {/* <AdminWrapper>
                            <AddingTempPlayer  tournamentId={props.id} onPlayerAdded={(uid, tempPlayerName, tempPlayerStars) => tempPlayerAddedHandler(uid, tempPlayerName, tempPlayerStars, 'low')}/>
                        </AdminWrapper> */}
                    </div>
                </div>
                <Card >
                    {userContext.userExists && <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        {!isUserJoined && <button onClick={joinTournamentHandler} className="participants-join-button">JOIN</button>}
                        {isUserJoined && <button onClick={() => {leaveTournamentHandler(userContext.user.userId)}} className="participants-leave-button">LEAVE</button>}
                        <AdminWrapper>
                            <Popconfirm title='Are you sure that you want to create teams?' onConfirm={createTeams} >
                                <button  className='participants-lock-button'>Create Teams</button>
                            </Popconfirm>
                        </AdminWrapper>
                    </div>}
                </Card>
            </div>
        </LoadingComponent>
    )
}

function getPlayersLength(players) {
    return players?.length ?? 0;
}


function getPlayerOfCurrentUser(user, tournamentId) {
    return {
        userId: user.userId,
        name: user.name,
        stars: user.stars,
    }
}



export default TournamentData;
import { useContext } from 'react';
import { removePlayerFromTournament } from '../../../Adapters/TournamentPlayersProvider';
import { UserContext } from '../../../Store/UserContext';
import Stars from '../../UI/Stars';
import './ParticipantsList.css'

function ParticipantsList(props) {

    const userContext = useContext(UserContext);
    const players = props.players;

    const onRemovePlayer = async (playerId) => {
        props.onPlayerRemoved(playerId);
    };

    return (
        <>
            <div>
                {players.map( (player) => 
                    <div key={player.id}>
                        <div className='row'>
                            
                            <div className='player-name'>
                                
                                {player.name}
                                {userContext.user.isAdmin && <label className='remove-player' onClick={ ()=> {
                                    onRemovePlayer(player.name)
                                }}>(Remove)</label>}
                                </div>
                            <div>
                            <Stars stars={player.stars}/>
                            </div>
                        </div>
                        <div className='divider'/>
                    </div>
                )}
            </div>
            <div className='hard-divider'/>
        </>
    );

}

export default ParticipantsList;
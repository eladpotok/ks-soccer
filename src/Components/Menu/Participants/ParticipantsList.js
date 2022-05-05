import { Skeleton } from 'antd';
import { useContext, useState } from 'react';
import { UserContext } from '../../../Store/UserContext';
import { checkIsAdmin } from '../../../Utils/commonUtils';
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
                <Skeleton style={{height: '10px'}} loading={props.isLoading} active>
                         <div key={player.id}>
                        <div className='row'>
                            <div className='player-name'>
                                {player.name}
                                {checkIsAdmin(userContext.user.isAdmin) && props.allowRemove && <label className='remove-player' onClick={ ()=> {
                                    onRemovePlayer(player.name)
                                }}>(Remove)</label>}
                                </div>
                            <div>
                            <Stars stars={player.stars}/>
                            </div>
                        </div>
                        <div className='divider-player-list'/>
                    </div>
                 </Skeleton>
                
                )}
            </div>
         
        </>
    );

}

export function TournamentDataMobileView(props) {
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
                                {userContext.user.isAdmin && props.allowRemove && <label className='remove-player' onClick={ ()=> {
                                    onRemovePlayer(player.name)
                                }}>(Remove)</label>}
                                </div>
                            <div>
                            <Stars stars={player.stars}/>
                            </div>
                        </div>
                        <div className='divider-player-list'/>
                    </div>
                )}
            </div>
            <div className='hard-divider'/>
        </>
    );
}

export default ParticipantsList;
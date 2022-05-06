import { Button, Skeleton } from 'antd';
import { useContext, useState } from 'react';
import { UserContext } from '../../../Store/UserContext';
import { checkIsAdmin } from '../../../Utils/commonUtils';
import Stars from '../../UI/Stars';
import './ParticipantsList.css'
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs'
import { GROUP_TYPE } from '../../../Utils/makeGroups';

function ParticipantsList(props) {

    const userContext = useContext(UserContext);

    const players = props.players;

    const onRemovePlayer = async (playerId) => {
        props.onPlayerRemoved(playerId);
    };

    const onMoveLevelHandler = async (playerId) => {
        props.onMovePlayer(playerId);
    }

    return (
        <>
            <div>
                {players.map((player) =>
                    <Skeleton style={{ height: '10px' }} loading={props.isLoading} active>
                        <div key={player.id}>
                            <div className='row'>
                                <div className='player-name'>
                                    {player.name}
                                    {checkIsAdmin(userContext.user.isAdmin) && props.allowRemove && <label className='remove-player' onClick={() => {
                                        onRemovePlayer(player.name)
                                    }}>(Remove)</label>}
                                </div>
                                <div>
                                    <Stars stars={player.stars} />
                                    {checkIsAdmin(userContext.user.isAdmin) && props.levelType && <label style={{ borderStyle: 'solid', borderRadius: '10px', opacity: '0.7' , borderWidth: '1px', borderColor: 'grey',  marginLeft: '4px', marginRight: '4px' }} />}
                                    {checkIsAdmin(userContext.user.isAdmin) && props.levelType === GROUP_TYPE.low && <BsArrowLeftSquare style={{ color: 'green', height: '16px', widht: '16px', marginBottom: '-5px' }} onClick={() => { onMoveLevelHandler(player.id) }} />}
                                    {checkIsAdmin(userContext.user.isAdmin) && props.levelType === GROUP_TYPE.high && <BsArrowRightSquare style={{ color: 'green', height: '16px', widht: '16px', marginBottom: '-5px' }} onClick={() => { onMoveLevelHandler(player.id) }} />}
                                </div>
                            </div>
                            <div className='divider-player-list' />
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
                {players.map((player) =>
                    <div key={player.id}>
                        <div className='row'>
                            <div className='player-name'>
                                {player.name}
                                {userContext.user.isAdmin && props.allowRemove && <label className='remove-player' onClick={() => {
                                    onRemovePlayer(player.name)
                                }}>(Remove)</label>}
                            </div>
                            <div>
                                <Stars stars={player.stars} />
                            </div>
                        </div>
                        <div className='divider-player-list' />
                    </div>
                )}
            </div>
            <div className='hard-divider' />
        </>
    );
}

export default ParticipantsList;
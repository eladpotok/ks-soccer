import { Button, Card, Popconfirm, Space, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Store/UserContext';
import Stars from '../../UI/Stars';
import './ParticipantsList.css'
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs'
import { GoDiffRemoved } from 'react-icons/go'
import { GROUP_TYPE } from '../../../Utils/makeGroups';
import AdminWrapper, { UserWrapper } from '../../UI/AdminWrapper';
import { AiOutlineSortAscending } from 'react-icons/ai';
import { BsSortNumericDownAlt } from 'react-icons/bs';
import { PlayersContext } from '../../../Store/PlayersContext';
import { checkIsAdmin } from '../../../Utils/commonUtils';

function ParticipantsList(props) {

    const playersContext = useContext(PlayersContext);
    const userContext = useContext(UserContext);

    const players = playersContext.players;

    const removePlayerHandler = async (playerId) => {
        props.onPlayerRemoved(playerId);
    };

    function getPlayersLength() {
        return players?.length ?? 0;
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Rank',
            dataIndex: 'stars',
            key: 'stars',
            sorter: (a, b) => a.stars - b.stars,
            render: (text, record) => (
                <Stars stars={record.stars} />
            ),
        }
    ];

    if(checkIsAdmin(userContext.user.isAdmin)) {
        columns.push( {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() =>  {  removePlayerHandler(record.userId) }}>Remove</a>
                </Space>
            )
        });
    }

    return (
        <Card>
            <Table columns={columns} dataSource={players} />
        </Card>
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
                                    onRemovePlayer(player.id)
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
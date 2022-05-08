import { Button, Card, Input, Popconfirm, Slider, Table } from "antd";
import React, { useState } from "react";
import { setPlayerStars } from "../../Adapters/TournamentPlayersProvider";
import { SingleStar } from "../UI/Stars";
import './PlayersList.css'

function PlayersList(props) {

    const [playersList, setPlayersList] = useState(props.players);
    function playerStarsEditHandler(playerToEdit) {
        const newList = playersList.map((player) => {
            if (player.id === playerToEdit.id) {
                const updatedItem = {
                    ...player,
                    stars: playerToEdit.stars,
                };

                return updatedItem;
            }

            return player;
        });

        setPlayerStars(playerToEdit.id, playerToEdit.stars);
        setPlayersList(newList);
    }

    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Stars',
            key: 'stars',
            dataIndex: 'stars',
            editable: true,
            render: (text, record) => (<Slider value={typeof text === 'number' ? text : 0} max={5.0} step={0.5} onChange={
                (value) => {
                    record.stars = value;
                    console.log(playersList);
                    const newList = playersList.filter( t=> t.id !== record.id);
                    setPlayersList([...newList, record]);
                }
            } />),
            sorter: (a, b) => a.stars - b.stars,
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) => <Popconfirm title="Sure to delete?" onConfirm={() => playerStarsEditHandler(record)}>
                <a>Save</a>
            </Popconfirm>
        }
    ];

    return <>
        <Card title='Players'>

            <Table columns={columns} dataSource={props.players} >

            </Table>

        </Card>
    </>
}


export default PlayersList;
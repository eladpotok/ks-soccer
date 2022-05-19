import { Button, Card, Input, Popconfirm, Slider, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getAllUsers, setUserStars } from "../../Adapters/UsersProvider";
import { SingleStar } from "../UI/Stars";
import './PlayersList.css'

function PlayersList(props) {

    const [usersList, setUsersList] = useState(null);

    useEffect(() => { 
        (async () => { 
            console.log('1')
            if (!usersList) {
                console.log('2')
                const allUsers = await getAllUsers();
                if(!allUsers) {
                    return;
                }
                setUsersList(allUsers);
            }
        })() 
      }, [usersList])

    function playerStarsEditHandler(playerToEdit) {
        const newList = usersList.map((player) => {
            if (player.id === playerToEdit.id) {
                const updatedItem = {
                    ...player,
                    stars: playerToEdit.stars,
                };

                return updatedItem;
            }

            return player;
        });

        setUserStars(playerToEdit.id, playerToEdit.stars);
        setUsersList(newList);
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
                    console.log(usersList);
                    const newList = usersList.filter( t=> t.id !== record.id);
                    setUsersList([...newList, record]);
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

            <Table columns={columns} dataSource={usersList} >

            </Table>

        </Card>
    </>
}


export default PlayersList;
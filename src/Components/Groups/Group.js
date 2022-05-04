import ParticipantsList from "../Menu/Participants/ParticipantsList";
import {FaTshirt} from 'react-icons/fa';
import './Group.css'
import { Card } from "antd";

function Group(props) {

    const groupPlayers = props.players;

    const classes = props.className;

    return (
        
        <div className={classes}>
            <Card >
                <div className="group-header">
                    {props.color === 'blue' && <div className='shirt-blue'><FaTshirt className="shirt-icon"/></div>}
                    {props.color === 'orange' && <div className='shirt-orange'><FaTshirt className="shirt-icon"/></div>}
                    {props.color === 'green' && <div className='shirt-green'><FaTshirt className="shirt-icon"/></div>}
                    &nbsp;&nbsp; Team {props.teamId}
                </div>
                <ParticipantsList allowRemove={false} players={groupPlayers}/>
            </Card>
        </div>
    );

}

export default Group;
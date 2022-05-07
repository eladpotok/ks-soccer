import ParticipantsList from "../Menu/Participants/ParticipantsList";
import {FaTshirt} from 'react-icons/fa';
import './Group.css'
import { Card } from "antd";

function Group(props) {

    const groupPlayers = props.players;

    const classes = props.className;

    const shirtClass = 'shirt-' + props.color;

    return (
        
        <div className={classes}>
            <Card >
                <div className="group-header">
                    <div className={shirtClass}><FaTshirt className="shirt-icon"/></div>
                    &nbsp;&nbsp; Team {props.teamId}
                </div>
                <ParticipantsList showPaid={true} color='black' allowRemove={false} players={groupPlayers}/>
            </Card>
        </div>
    );

}

export default Group;
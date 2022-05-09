import { AiOutlineUserAdd } from 'react-icons/ai';

import { Button, Col, Input, Row, Slider } from "antd";
import { useState } from 'react';

function AddingTempPlayer(props) {

    const [tempPlayerName, setTempPlayerName] = useState('');
    const [tempPlayerStars, setTempPlayerStars] = useState(0);

    const tempPlayerAddedHandler = async () => {
        
        if(tempPlayerName !== '' && tempPlayerStars > 0) {
            
            const uid = tempPlayerName + Math.floor(Math.random() * 100);
            props.onPlayerAdded(uid, tempPlayerName, tempPlayerStars);
            setTempPlayerName('');
            setTempPlayerStars(0);
        }
        else {
            // show log
        }
    }

    return (<div>
        <Row >
            <Col style={{width: '40%'}} ><Input placeholder="Enter player name" onChange={(e)=> {setTempPlayerName(e.target.value)}}/></Col>
            <Col style={{width: '40%'}} offset={1}><Slider min={1} max={5} step={0.5} onChange={(value)=> {setTempPlayerStars(value)}}/></Col>
            <Col style={{width: '10%'}} offset={1}><Button icon={<AiOutlineUserAdd/>} size='large' onClick={() => {tempPlayerAddedHandler()}}></Button></Col>
        </Row>
    </div>);
}


export default AddingTempPlayer;
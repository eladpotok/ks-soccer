import { AiOutlineUserAdd } from 'react-icons/ai';

import { Button, Col, Input, Row, Slider } from "antd";
import { useState } from 'react';

import './AddingTempPlayer.css'


function AddingTempPlayer(props) {

    const [tempPlayerName, setTempPlayerName] = useState('');
    const [tempPlayerStars, setTempPlayerStars] = useState(0);

    const tempPlayerAddedHandler = async () => {

        if (tempPlayerName !== '' && tempPlayerStars > 0) {

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
        <article className="add-player-to-tournament" style={{ marginTop: '10px' }}>
            <Input style={{marginRight: '10px', width: '200px' , borderRadius: '15px'}} placeholder="Enter player name" onChange={(e) => { setTempPlayerName(e.target.value) }} />
            <Slider style={{marginRight: '10px', width: '180px'}} min={1} max={5} step={0.5} onChange={(value) => { setTempPlayerStars(value) }} />
            <Button   className='add-player-button'   icon={<AiOutlineUserAdd />} onClick={() => { tempPlayerAddedHandler() }}></Button>
        </article>

    </div>);
}


export default AddingTempPlayer;
import { Card, Col, Input, InputNumber, Row, Slider, Tooltip } from "antd";
import { useRef, useState } from "react";
import Button from "../UI/Button";
import './Registration.css'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { isMobile } from "react-device-detect";


function Registration(props) {
    
    const [playerName, setPlayerName] = useState('');
    const [levelState, setLevelState] = useState(1);

    const registerHandler = async (event) => {
        const playerLevel = levelState;
        if (playerName === '' || playerName === undefined) {
            alert('name can not be empty');
            return;
        }
        
        console.log('resgiter with' , playerName);
        await props.onRegistered(playerName, playerLevel);
    };

    const loginHandler = async (event) => {
        await props.onLogin();
    };


    const onLevelChangedHandler = value => {
        setLevelState(value);
    };

    const playerNameChangedHandler = value => {
        setPlayerName(value.target.value);
    };

    const registerInputClass = isMobile ? null : 'register-input';
    const levelLabelClass = isMobile ? 'item-title-mobile' : 'item-title';

    return (
        <>
            <div className='register-card' title='Registration'>
                Hey, You are able to resigter to the system if you're a new player:
                <br></br><br></br>
                <div className={registerInputClass}>
                    <div>
                        <div className='item-title'>Name:</div>
                        <Input
                            onChange={playerNameChangedHandler}
                            placeholder="Your username"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Enter your name as it will be displayed">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </div>
                    <div>
                        <div className={levelLabelClass}>Level:&nbsp;&nbsp;</div>

                        <Row className="level-slider">
                            <Col span={12}>
                                <Slider
                                    min={1}
                                    max={5}
                                    step={0.5}
                                    onChange={onLevelChangedHandler}
                                    style={{  width: '150px' }}
                                    value={typeof levelState === 'number' ? levelState : 0}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={5}
                                    style={{ marginLeft: '40px', width: '50px'}}
                                    value={levelState}
                                    onChange={onLevelChangedHandler}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Button onClick={registerHandler}  type='submit' className='register-button'>Register</Button>

                </div>
                <div className="divider-player-list" style={{ margin: '20px 0px'}} />
                Or you can Login if you're already registered
                <Button onClick={loginHandler} className='register-button' type='submit' >Login</Button>


            </div>
        </>);

}

export default Registration;
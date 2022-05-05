import { useContext, useState } from "react";
import { login, registerNewPlayer } from "../../Adapters/TournamentPlayersProvider";
import { auth, signInWithGoogle } from "../../firebase";
import Registration from "./Registration";
import { UserContext } from '../../Store/UserContext'
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Card, Input, Modal, Skeleton, Tooltip, Col, InputNumber, Row, Slider } from "antd";
import { isMobile } from "react-device-detect";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';


function User() {
    const userContext = useContext(UserContext);

    const [isLoading, setLoading] = useState(false);
    const [inFirstStepState, setFirstStepState] = useState(true);
    const [playerName, setPlayerName] = useState('');
    const [levelState, setLevelState] = useState(1);
    const [uid, setUid] = useState('');



    async function loginHandler() {
        setLoading(true);
        const googleRegisterResponse = await signInWithGoogle();
        if (!googleRegisterResponse) {
            setLoading(false);
            return;
        }

        const loginUserResponse = await login(googleRegisterResponse.uid);
        if (!loginUserResponse) {
            setUid(googleRegisterResponse.uid);
            setFirstStepState(false);
            setLoading(false);
            return;
        }

        userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin);
        setLoading(false);
    };

    async function registerHandler() {
        setLoading(true);
        const isSuceeded = await registerNewPlayer({ name: playerName, stars: levelState, id: uid })
        if (!isSuceeded) {
            setLoading(false);
            return;
        }

        const loginUserResponse = await login(uid);
        userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin);
        setLoading(false);
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
            {<Modal title="Hey Guest" closable={false}
                visible={!userContext.isAuthorized}

                footer={inFirstStepState ?
                    <Button
                        key="login"
                        type="primary"
                        loading={isLoading}
                        onClick={loginHandler}>
                        Login with Google
                    </Button> :
                    <Button
                        loading={isLoading}
                        onClick={registerHandler}
                        type='primary'
                        className='register-button'>Register</Button>
                }

            >
                {!userContext.isAuthorized && <div>Please authorize yourself by Google</div>}
                {!inFirstStepState && <div>This is your first time, Please fill your info</div>}
                {!inFirstStepState && <div className={registerInputClass}>
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
                                    style={{ width: '150px' }}
                                    value={typeof levelState === 'number' ? levelState : 0}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={5}
                                    step={0.5}
                                    style={{ marginLeft: '40px', width: '50px' }}
                                    value={levelState}
                                    onChange={onLevelChangedHandler}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>}
            </Modal>}
        </>
    );
}

export default User;
import { useContext, useState } from "react";
import { signInWithGoogle } from "../../firebase";
import { UserContext } from '../../Store/UserContext'
import { Button, Modal } from "antd";
import UserInfoEdit from "./UserInfoEdit";
import { login, registerNewUser } from "../../Adapters/UsersProvider";


function User() {
    const userContext = useContext(UserContext);

    const [playerName, setPlayerName] = useState('');
    const [preference, setPreference] = useState('low');
    const [levelState, setLevelState] = useState(1);

    const [isLoading, setLoading] = useState(false);
    const [inFirstStepState, setFirstStepState] = useState(true);
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

        userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin, loginUserResponse.preference, loginUserResponse.id);
        setLoading(false);
    };


    const onLevelChangedHandler = value => {
        setLevelState(value);
    };

    const playerNameChangedHandler = value => {
        setPlayerName(value.target.value);
    };

    const onRadioChangedHandler = e => {
        const value = e.target.value;
        setPreference(value);
    };

    async function registerHandler() {
        setLoading(true);
        const isSuceeded = await registerNewUser({ name: playerName, stars: levelState, id: uid, preference: preference })
        if (!isSuceeded) {
            setLoading(false);
            return;
        }

        const loginUserResponse = await login(uid);
        userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin, loginUserResponse.preference, loginUserResponse.id);
        setLoading(false);
    };

    return (
        <>
            {<Modal title="Hey Guest" closable={false}
                visible={!userContext.isAuthorized}

                footer={  inFirstStepState ? <Button
                    key="login"
                    type="primary"
                    loading={isLoading}
                    onClick={loginHandler}>
                    Login with Google
                </Button> :  <Button
                    key="register"
                    type="primary"
                    loading={isLoading}
                    onClick={registerHandler}>
                    Register
                </Button>}>
                {!userContext.isAuthorized && <div>Please authorize yourself by Google</div>}
                {!inFirstStepState && <UserInfoEdit title='This is your first time, Please fill your info' playerName={playerName} levelState={levelState} preference={preference} onPlayerNameChanged={playerNameChangedHandler} onLevelChanged={onLevelChangedHandler} onRadioChanged={onRadioChangedHandler} uid={uid}/>}
            </Modal>}
        </>
    );
}

export default User;
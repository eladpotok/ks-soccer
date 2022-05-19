import { Button, Modal } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser, login } from "../../Adapters/UsersProvider";
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import { UserContext } from "../../Store/UserContext";
import UserInfoEdit from "./UserInfoEdit";

function UserEditorWrapper() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState(userContext.user.username);
    const [preference, setPreference] = useState(userContext.user.preference);
    const [levelState, setLevelState] = useState(userContext.user.level);
    const [isLoading, setLoading] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

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

    async function editUserHandler() {
        setLoading(true);
        const isSuceeded = await editUser( userContext.user.id ,  playerName,  levelState,  preference )
        if (isSuceeded) {
            const loginUserResponse = await login(userContext.user.id);
            userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin, loginUserResponse.preference, loginUserResponse.id);
            setLoading(false);
            closedHandler();
            return;
        }

        setLoading(false);
    };

    function closedHandler() {
        setIsClosed(true);
        navigate('/');
    }

    return (<Modal visible={!isClosed}
            title={playerName} onCancel={closedHandler}
            footer={[<Button
            key="register"
            type="primary"
            loading={isLoading}
            onClick={editUserHandler}>
            Save
        </Button>, <Button
            key="close"
            type="secondary"
            loading={isLoading}
            onClick={closedHandler}>
            Close
        </Button>]}>
        <UserInfoEdit title='Edit your information' playerName={playerName} levelState={levelState} preference={preference} onPlayerNameChanged={playerNameChangedHandler} onLevelChanged={onLevelChangedHandler} onRadioChanged={onRadioChangedHandler} uid={userContext.user.id} />
    </Modal>)
}


export default UserEditorWrapper;
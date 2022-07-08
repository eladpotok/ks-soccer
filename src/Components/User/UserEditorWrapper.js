import { Button, Modal } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser, login } from "../../Adapters/UsersProvider";
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import { UserContext } from "../../Store/UserContext";
import UserInfoEdit from "./UserInfoEdit";

function UserEditorWrapper(props) {

    const nevigate = useNavigate();
    const userContext = useContext(UserContext);

    const [user, setUser] = useState(userContext.user ?? {
        userId: props.userId,
        name: '',
        position: '',
        stars: 2.5,
        unit: '',
        isAdmin: false
    });

    async function saveUserToDb() {
        console.log(`save to db the user ${JSON.stringify(user)}`)
        userContext.editUser(user);
    }

    function close() {
        nevigate('/');
    }

    return (<Modal visible={true}
            onCancel={close}
            footer={[<Button
            key="register"  
            type="primary"
            onClick={saveUserToDb}>
            Save
        </Button>, <Button
            key="close"
            type="secondary"
            onClick={close}>
            Close
        </Button>]}>
        <UserInfoEdit user={user} setUser={setUser} title='Edit your information'/>
    </Modal>)
}


export default UserEditorWrapper;
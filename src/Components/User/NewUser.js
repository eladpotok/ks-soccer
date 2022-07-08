import { Button, Card, Input, Modal, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { login2, register } from "../../Adapters/UsersProvider";
import UserDetails from "./UserDetails";
import MailAndPassword from "./MailAndPassword";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Store/UserContext";

function NewUser() {

    const nevigate = useNavigate();
    const userContext = useContext(UserContext);

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUserModalShown, setNewUserModalShown] = useState(true);



    function registerUser() {
        register(mail, password).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                console.log('error', res)
            }
        }).then((data) => {
            const userId = data.localId;
            userContext.onLogin(userId);
            close();
            nevigate(`/fillDetails/${userId}`);
        })
    }

    function close() {
        setNewUserModalShown(false);
        nevigate('/');
    }

    return (
        <>
            <Card style={{width: '300px', margin: 'auto'}}
                title='Register'>
                <MailAndPassword setMail={setMail} setPassword={setPassword} mail={mail} password={password} />
                <Button
                    key="register"
                    type="primary"
                    onClick={registerUser}>
                    Register
                </Button>
                <Button
                    key="close"
                    onClick={close}
                    type="secondary">
                    Close
                </Button>
            </Card>
        </>
    )
}

export default NewUser;
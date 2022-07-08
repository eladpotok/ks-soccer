import { Button, Card, Modal } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login2 } from "../../Adapters/UsersProvider";
import { LoginResult, UserContext } from "../../Store/UserContext";
import MailAndPassword from "./MailAndPassword";

import './Login.css'

function Login() {

    const nevigate = useNavigate();
    const userContext = useContext(UserContext);

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    async function loginUser() {
        login2(mail, password).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                console.log('error', res)
            }
        }).then(async (data) => {
            const userId = data.localId;
            if (userId) {
                const loginResponse = await userContext.onLogin(userId);
                if (loginResponse === LoginResult.Completed) {
                    nevigate('/');
                }
            }
            else {
                console.log('login error', data);
            }
        })
    }

    function close() {
        nevigate('/');
    }

    return (
        <>
            <div className="login-card">
                <MailAndPassword setMail={setMail} setPassword={setPassword} mail={mail} password={password} />
                <Button
                    key="register"
                    type="primary"
                    isLoading={isLoading}
                    onClick={loginUser}>
                    Login
                </Button>
                <Button
                    onClick={close}
                    key="close"
                    type="secondary">
                    Close
                </Button>
            </div>
        </>
    )

}

export default Login;
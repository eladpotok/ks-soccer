import { useContext, useState } from "react";
import { login, registerNewPlayer } from "../../Adapters/TournamentPlayersProvider";
import { auth, signInWithGoogle } from "../../firebase";
import Registration from "./Registration";
import { UserContext } from '../../Store/UserContext'
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, Skeleton } from "antd";


function User() {
    const userContext = useContext(UserContext);

    const [isLoading, setLoading] = useState(false);

    async function loginHandler() {
        setLoading(true);
        const googleRegisterResponse = await signInWithGoogle();
        if (!googleRegisterResponse) {
            setLoading(false);
        }

        if (googleRegisterResponse.res === 'user-exist') {
            const user = googleRegisterResponse.user;
            const loginUserResponse = await login(user.uid);
            userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin);
        }
        else {
            alert('This is your first time visiting this page, Please register first');
        }

        setLoading(false);
    };

    async function registerHandler(playerName, playerLevel) {
        setLoading(true);
        const googleRegisterResponse = await signInWithGoogle();
        if (!googleRegisterResponse) {
            setLoading(false);
            return;
        }

        if (googleRegisterResponse.res === 'user-exist') {
            alert('User already exist, please log-in with your google credentials');
            setLoading(false);
            return;
        }
        const isSuceeded = await registerNewPlayer({ name: playerName, stars: playerLevel, id: googleRegisterResponse.uid })
        if (!isSuceeded) {
            setLoading(false);
            return;
        }

        const loginUserResponse = await login(googleRegisterResponse.uid);
        userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin);
        setLoading(false);
    };

    return (
        <>

            {!userContext.isAuthorized && <Card title='Registration'>
                <Skeleton className='register-card' loading={isLoading} active>
                    <Registration onRegistered={registerHandler} onLogin={loginHandler} />
                </Skeleton>
            </Card>}
        </>
    );


}

export default User;
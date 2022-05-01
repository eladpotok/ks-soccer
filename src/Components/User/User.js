import { useContext } from "react";
import { login, registerNewPlayer } from "../../Adapters/TournamentPlayersProvider";
import { auth, signInWithGoogle } from "../../firebase";
import Registration from "./Registration";
import {UserContext} from '../../Store/UserContext'
import { useAuthState } from "react-firebase-hooks/auth";


function User() {
    const userContext = useContext(UserContext);
    const [user, loading, error] = useAuthState(auth);


    async function loginHandler() {
        const googleRegisterResponse = await signInWithGoogle();
        if(!googleRegisterResponse) return;

        if(googleRegisterResponse.res === 'user-exist') {
            const user = googleRegisterResponse.user;
            const loginUserResponse = await login(user.uid);
            userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin);
        }

        
    };

    async function registerHandler  (playerName, playerLevel) {
        const googleRegisterResponse = await signInWithGoogle();
        if(!googleRegisterResponse) return;

        console.log('1')
        if(googleRegisterResponse.res === 'user-exist') {
            alert('User already exist, please log-in with your google credentials');
            return;
        }
        console.log('2')
        const isSuceeded = await registerNewPlayer({name: playerName, stars: playerLevel, id: googleRegisterResponse.uid})
        if(!isSuceeded) return;

        const loginUserResponse = await login(googleRegisterResponse.uid);
        userContext.onLogin(loginUserResponse.name, loginUserResponse.stars, loginUserResponse.isAdmin);
    };

    return (
        <>
            {!userContext.isAuthorized && <Registration onRegistered={registerHandler} onLogin={loginHandler} />}
        </>
    );


}

export default User;
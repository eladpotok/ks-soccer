import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getPlayerById, savePreferenceUser } from "../Adapters/TournamentPlayersProvider";
import { auth } from "../firebase";

export const UserContext = React.createContext({
    user: {
        username: '',
        level: '',
        isAdmin: false
    },
    onLogin: (username, level, isAdmin, preference, id) => {},
    onLogout: () => {},
    isAuthorized: false,
});


export const UserContextProvider = (props) => {
    
    const [googleUser, loading, error] = useAuthState(auth);
    console.log(googleUser);
    let startingUserData = {};

    if(keepMeLogin() && googleUser) {
        fetchUserFromDB();
    }

    async function fetchUserFromDB() {
        const data = await getPlayerById(googleUser.uid);
        startingUserData = data;
        
        setUserId(googleUser.uid);
        setUsername(startingUserData.name);
        setLevel(startingUserData.stars);
        setAdmin(startingUserData.isAdmin);
        setPreference(startingUserData.preference);
        setUserId(googleUser.uid);
        setAuthorize(startingUserData.name!= null);
    }

   
    
    const [userId, setUserId] = useState(startingUserData.id);
    const [username, setUsername] = useState(startingUserData.name);
    const [level, setLevel] = useState(startingUserData.stars);
    const [isAdmin, setAdmin] = useState(startingUserData.isAdmin);
    const [preference, setPreference] = useState(startingUserData.preference);
    const [isAuthorized, setAuthorize] = useState(username != null);

    const user = { username: username, level: level, isAdmin: isAdmin, preference: preference , id: userId }

    const loginHandler = (username, level, isAdmin, preference, id) => {
        setUserId(id);
        setUsername(username);
        setLevel(level);
        setAdmin(isAdmin);
        setPreference(preference);
        setAuthorize(true);
        setKeepMeLogin(true);
    };

    const logoutHandler = () => {
        setUserId('');
        setUsername('');
        setLevel(0);
        setAdmin(false);
        setPreference('');
        setAuthorize(false);
        setKeepMeLogin(false);
    };


    return <UserContext.Provider value={{
        user: user,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        isAuthorized: keepMeLogin() || isAuthorized
    }}>
        {props.children}    
    </UserContext.Provider>
};

function keepMeLogin() {
    return localStorage.getItem('keep_me_login_in') === 'true';
}

function setKeepMeLogin(value) {
    return localStorage.setItem('keep_me_login_in',value);
}
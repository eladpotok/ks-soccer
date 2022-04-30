import React, { useState } from "react";

export const UserContext = React.createContext({
    user: {
        username: localStorage.getItem('my_name'),
        level: localStorage.getItem('my_level'),
        isAdmin: localStorage.getItem('isAdmin')
    },
    onLogin: (username, level, isAdmin) => {},
    onLogout: () => {},
    isAuthorized: false
});


export const UserContextProvider = (props) => {
    
    const [username, setUsername] = useState(localStorage.getItem('my_name'));
    const [level, setLevel] = useState(localStorage.getItem('my_level'));
    const [isAdmin, setAdmin] = useState(localStorage.getItem('isAdmin'));
    const [isAuthorized, setAuthorize] = useState(username != null);

    const user = { username: username, level: level, isAdmin: isAdmin }

    const loginHandler = (username, level, isAdmin) => {
        setUsername(username);
        setLevel(level);
        setAdmin(isAdmin);
        localStorage.setItem('my_name', username);
        localStorage.setItem('my_level', level);
        localStorage.setItem('isAdmin', isAdmin);
        setAuthorize(true);
    };

    const logoutHandler = () => {
        setUsername('');
        setLevel(0);
        setAdmin(false);
        localStorage.removeItem('my_name');
        localStorage.removeItem('my_level');
        localStorage.removeItem('isAdmin', isAdmin);
        setAuthorize(false);
    };

    return <UserContext.Provider value={{
        user: user,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        isAuthorized: isAuthorized
    }}>
        {props.children}    
    </UserContext.Provider>
};
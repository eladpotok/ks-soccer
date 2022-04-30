import React, { useState } from "react";

export const UserContext = React.createContext({
    user: {
        username: localStorage.getItem('my_name'),
        level: localStorage.getItem('my_level')
    },
    onLogin: (username, level) => {},
    isAuthorized: false
});


export const UserContextProvider = (props) => {
    
    const [username, setUsername] = useState(localStorage.getItem('my_name'));
    const [level, setLevel] = useState(localStorage.getItem('my_level'));
    
    const user = { username: username, level: level }

    const loginHandler = (username, level) => {
        setUsername(username);
        setLevel(level);
        localStorage.setItem('my_name', username);
        localStorage.setItem('my_level', level);
    };

    return <UserContext.Provider value={{
        user: user,
        onLogin: loginHandler,
        isAuthorized: user.username != null
    }}>
        {props.children}    
    </UserContext.Provider>
};
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { addUserToDb, getUserById } from "../Adapters/UsersProvider";
import { auth } from "../firebase";

export const UserContext = React.createContext({
    user: {
        username: '',
        level: '',
        isAdmin: false
    },
    onLogin: (tokenId) => { },
    onLogout: () => { },
    tokenExists: false,
});

const emptyUser = {
    name: '',
    stars: 0,
    isAdmin: false
}

export const LoginResult = {
    Completed: 'completed',
    Failed: 'failed',
    FillInfo: 'fillInfo'
}

export const UserContextProvider = (props) => {

    const [user, setUser] = useState(emptyUser);
    const nevigate = useNavigate();

    const userTokenFromStorage = localStorage.getItem('userToken');
    const [userToken, setUserToken] = useState(userTokenFromStorage);
    
    useEffect(() => { 
        (async () => { 
            if (userToken) {
                const user = await getUserById(userToken);
                if(user) {
                    setUser(user);
                }
                else {
                    console.log(`tried to fetch user by token ${userToken} but wasn't found in db`)
                    nevigate(`/fillDetails/${userToken}`)
                }
            }
            else {
                console.log(`user token wasn't set`)
            }
        })() 
      }, [userToken])
 

    const loginHandler = async (userId) => {
        setUserToken(userId);
        localStorage.setItem('userToken', userId);
        try {
            const user = await getUserById(userId);
            if(user) {
                setUser(user);
                return LoginResult.Completed;
            }
            else {
                console.log(`tried to fetch user by token ${userToken} but wasn't found in db`)
                return LoginResult.FillInfo;
            }
        }
        catch {
            return LoginResult.Failed;
        }
    };

    const userEditedHandler = (user) => {
        addUserToDb(user).then( (res) => {
            setUser(user);
            nevigate('/');
        });
    };


    const logoutHandler = () => {
        setUserToken(null);
        localStorage.removeItem('userToken');
        setUser(emptyUser);
    };


    return <UserContext.Provider value={{
        user: user,
        editUser: userEditedHandler,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        tokenExists: userToken !== null,
        userExists: user !== emptyUser
    }}>
        {props.children}
    </UserContext.Provider>
};

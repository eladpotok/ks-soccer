import React, { useState } from "react";

export const SCREENS = {
    Teams: 'teams',
    TournamentData: 'tournamentData',
    TournamentPreview: 'tournamentPreview',
    PlayersList: 'playersList',
    EditUser: 'editUser',
    None: 'none'
};

export const MainPageContext = React.createContext({
    screenData: {},
    onScreenChanged: () => {},
});


export const MainPageContextProvider = (props) => {
    
    const [screenDataState, setScreenDataState] = useState({ screen: SCREENS.None});

    function screenChangedHandler(sceeenData) {
        setScreenDataState(sceeenData);
    }

    return <MainPageContext.Provider value={{
        screenData: screenDataState,
        onScreenChanged: screenChangedHandler,
    }}>
        {props.children}    
    </MainPageContext.Provider>
};
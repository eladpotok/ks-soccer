import { useContext, useEffect, useState } from "react";
import { deleteTournament as deleteTournametFromDb, getAllTournaments, getTeams, saveTeams as saveTeamsForTournamentInDb } from "../../Adapters/TournamentPlayersProvider";
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import TeamsDistribution from "../Groups/TeamsDistribution";
import Participants from "./Participants/Participants";
import TournamentDate from "./TournamentDate";

function MainPage(props) {
    const mainPageScreenContext = useContext(MainPageContext);
    const screenState = mainPageScreenContext.screenData;

    async function updateTournaments() {
        let  tournaments = await getAllTournamentsFromDb();
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.TournamentPreview, data: tournaments });
    }

    useEffect( ()=> {
         if(screenState.screen === SCREENS.None) {
            updateTournaments();
         }
      }, [screenState]);

    const screenToCreatorMapper = {
        'teams': () => getTeamsScreen(screenState.data),
        'tournamentData':  () => getTournamentDataScreen(screenState.data),
        'tournamentPreview': () => getTournamentPreviewScreen(mainPageScreenContext, screenState.data),
        'none': () => { <div/> }
    };

    const content = screenToCreatorMapper[screenState.screen]();

    return (<>{content}</>);

}

function getTournamentPreviewScreen(mainPageScreenContext, data) {
    const tournamentDeletedHandler = async (id) => {
        await deleteTournametFromDb(id);
        const tournaments = await getAllTournamentsFromDb();
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.TournamentPreview, data: tournaments });
    };

    const drillDownHandler = (id, date, isLocked, teams) => {
        const screenToDisplay = getDrillDownScreen(id, date, isLocked, teams);
        mainPageScreenContext.onScreenChanged(screenToDisplay);
    };
    
    if(data.length === 0) {
        return <div className='no-tournaments'>no tournaments next</div>
    }

    return <div>
                {data.map( (preview) => 
                    <div>
                        <TournamentDate onRemoveDate={tournamentDeletedHandler} onGoToParticipants={drillDownHandler} className='tournament' date={preview} key={preview.id} id={preview.id} isLocked={preview.isLocked} teams={preview.teams}/>
                    </div>
                )}
        </div>
}

function getTournamentDataScreen(data) {
    async function teamsCreatedHandler(teams, tournamentId) { 
        await saveTeamsForTournamentInDb(tournamentId, teams);
    };
    return <Participants onTeamsCreated={teamsCreatedHandler} date={data.date} id={data.id} isLocked={data.isLocked} />
}

function getTeamsScreen(teams) {
    console.log('getTeamsScreen', teams);
    return <TeamsDistribution teams={teams} />
}

function getDrillDownScreen(id, date, isLocked, teams) {
    if(teams) {
        return { screen: SCREENS.Teams, data: teams };
    }
    return { screen: SCREENS.TournamentData, data: {id, date, isLocked, teams} };
}

function getAllTournamentsFromDb() {
    const tournaments =  getAllTournaments();
    return tournaments;
  };

export default MainPage;
import { useContext, useEffect, useState } from "react";
import { deleteTournament as deleteTournametFromDb, getAllTournaments, getTeams, saveTeams as saveTeamsForTournamentInDb } from "../../Adapters/TournamentPlayersProvider";
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import TeamsDistribution from "../Groups/TeamsDistribution";
import TournamentData from "./Participants/TournamentData";
import TournamentPreview from "./TournamentPreview";

function MainPage(props) {
    const mainPageScreenContext = useContext(MainPageContext);
    const screenState = mainPageScreenContext.screenData;

    async function updateTournaments() {
        let tournaments = await getAllTournaments();
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.TournamentPreview, data: tournaments });
    }

    useEffect(() => {
        if (screenState.screen === SCREENS.None) {
            updateTournaments();
        }
    }, [screenState]);

    const screenToCreatorMapper = {
        'teams': () => getTeamsScreen(screenState.data),
        'tournamentData': () => getTournamentDataScreen(screenState.data),
        'tournamentPreview': () => getTournamentPreviewScreen(mainPageScreenContext, screenState.data),
        'none': () => { <div /> }
    };

    const content = screenToCreatorMapper[screenState.screen]();

    return (<>{content}</>);

}

function getTournamentPreviewScreen(mainPageScreenContext, data) {
    if (data.length === 0) {
        return <div className='no-tournaments'>no tournaments next</div>
    }

    return <div>
        {data.map((preview) =>
            <div>
                <TournamentPreview className='tournament' date={preview} key={preview.id} id={preview.id} isLocked={preview.isLocked} teams={preview.teams} />
            </div>
        )}
    </div>
}

function getTournamentDataScreen(data) {
    async function teamsCreatedHandler(teams, tournamentId) {
        await saveTeamsForTournamentInDb(tournamentId, teams);
    };
    return <TournamentData onTeamsCreated={teamsCreatedHandler} date={data.date} id={data.id} isLocked={data.isLocked} />
}

function getTeamsScreen(teams) {
    return <TeamsDistribution teams={teams} />
}

export default MainPage;
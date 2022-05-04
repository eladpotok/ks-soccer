import { useContext, useEffect } from "react";
import { getAllTournaments, saveTeams as saveTeamsForTournamentInDb } from "../../Adapters/TournamentPlayersProvider";
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import TeamsDistribution from "../Groups/TeamsDistribution";
import TournamentData from "./Participants/TournamentData";
import TournamentPreview from "./TournamentPreview";
import './MainPage.css'
import PlayersList from "../Admin/PlayersList";
import { List } from "antd";

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
        'tournamentPreview': () => getTournamentPreviewScreen(screenState.data),
        'playersList': () => getPlayersScreen(screenState.data),
        'none': () => { <div /> }
    };

    const content = screenToCreatorMapper[screenState.screen]();
    return (<>{content}</>);
}

function getPlayersScreen(players) {
    return <PlayersList players={players} />
}

function getTournamentPreviewScreen(data) {
    if (data.length === 0) {
        return <div className='no-tournaments'>no tournaments next</div>
    }


    return <List
        bordered
        grid='{gutter: 1, column: 1}'
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
            <List.Item>
                <TournamentPreview date={item} key={item.id} id={item.id} teams={item.teams} />
            </List.Item>
        )}
    />
}

function getTournamentDataScreen(data) {
    async function teamsCreatedHandler(teams, tournamentId) {
        await saveTeamsForTournamentInDb(tournamentId, teams);
    };

    return <div ><TournamentData onTeamsCreated={teamsCreatedHandler} date={data.date} id={data.id} /></div>
}

function getTeamsScreen(teams) {
    return <div className='teams'><TeamsDistribution teams={teams} /></div>
}

export default MainPage;
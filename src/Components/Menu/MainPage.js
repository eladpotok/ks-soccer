import { useContext, useEffect } from "react";
import { getAllTournaments, saveTeams as saveTeamsForTournamentInDb } from "../../Adapters/TournamentPlayersProvider";
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import TeamsDistribution from "../Groups/TeamsDistribution";
import TournamentData from "./Participants/TournamentData";
import TournamentPreview from "./TournamentPreview";
import './MainPage.css'
import PlayersList from "../Admin/PlayersList";
import { List, Modal } from "antd";
import { isMobile } from "react-device-detect";
import UserInfoEdit from "../User/UserInfoEdit";
import UserEditorWrapper from "../User/UserEditorWrapper";

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
        'editUser': () => getEditUserScreen(screenState.data),
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
                grid='{gutter: 1, column: 1}'
                itemLayout="vertical"
                dataSource={data}
                renderItem={item => (
            <List.Item>
                <TournamentPreview title={item.title} date={item} key={item.id} id={item.id} teams={item.teams} />
            </List.Item>
        )}
    />
}

function getEditUserScreen(data) {


    return <div>
        <UserEditorWrapper/>
    </div>
}

function getTournamentDataScreen(data) {
    async function teamsCreatedHandler(teams, tournamentId) {
        await saveTeamsForTournamentInDb(tournamentId, teams);
    };

    return <div ><TournamentData onTeamsCreated={teamsCreatedHandler} date={data.date} id={data.id} /></div>
}

function getTeamsScreen(teams) {
    const groupContainerClass = !isMobile ? 'teams-card' :  'teams-card-mobile';

    return (
    <div className={groupContainerClass}>
        <div className='teams'><TeamsDistribution teams={teams.teamsHigh} isHigh={true} /></div>
        <div className='teams'><TeamsDistribution teams={teams.teamsLow} isHigh={false}/></div>
    </div>
        
    );
}

export default MainPage;
import { useContext, useState } from "react";
import { UserContext } from "../../Store/UserContext";
import Button from "../UI/Button";
import './TournamentPreview.css';

import { FaTrashRestoreAlt } from 'react-icons/fa';
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import { deleteTournament, getAllTournaments } from "../../Adapters/TournamentPlayersProvider";
import { checkIsAdmin } from "../../Utils/commonUtils";
import { Card } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Meta from "antd/lib/card/Meta";
import { useHistory } from "react-router-dom";
import AdminWrapper from "../UI/AdminWrapper";

function TournamentPreview(props) {
    const [isMouseHover, setMouseHover] = useState(false);
    const mainPageScreenContext = useContext(MainPageContext);
    const userContext = useContext(UserContext);

    const showTournamentHandler = () => {

        props.onMoveToTournament(props.id);
        //history.push(`/tournaments/${props.id}`)
        // if (props.teams) {
        //     mainPageScreenContext.onScreenChanged({ screen: SCREENS.Teams, data: { teamsHigh: props.teams.teamsHigh, teamsLow: props.teams.teamsLow, tournamentId: props.id } });
        //     return;
        // }
        // mainPageScreenContext.onScreenChanged({ screen: SCREENS.TournamentData, data: { id: props.id, date: props.date.date, teams: props.teams } });
    };

    function getDayName(dateStr, locale) {
        var date = dateStr;
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    async function removeDateHandler() {
        // await deleteTournament(props.id);
        // const tournaments = await getAllTournaments();
        // mainPageScreenContext.onScreenChanged({ screen: SCREENS.TournamentPreview, data: tournaments });
    };



    return (
        <div>
            <div className="data-card" onClick={showTournamentHandler}>
                <h3>{getDayName(props.date.date, 'en-us')}</h3>
                <h4><label>{props.date.date.getDate().toString().padStart(2, '0')}</label>  | {(props.date.date.getMonth() + 1).toString().padStart(2, '0')} | {props.date.date.getFullYear()}</h4>
                <p>{props.title}</p>
                <span class="link-text">
                    View All Players
                    <svg width="22" height="16" style={{paddingTop: '4px'}} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#753BBD" />
                    </svg>
                </span>
                {/* <AdminWrapper>
                    <FaTrashRestoreAlt className="delete-icon" key="delete" onClick={removeDateHandler}/>
                </AdminWrapper> */}
            </div>
        </div>
    );
}

export default TournamentPreview;
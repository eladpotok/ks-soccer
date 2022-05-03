import { useContext, useState } from "react";
import { UserContext } from "../../Store/UserContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import './TournamentPreview.css';

import { FaTrashRestoreAlt } from 'react-icons/fa';
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import { deleteTournament, getAllTournaments } from "../../Adapters/TournamentPlayersProvider";

function TournamentPreview(props) {
    const [isMouseHover, setMouseHover] = useState(false);
    const mainPageScreenContext = useContext(MainPageContext);

    const userContext = useContext(UserContext);

    const showTournamentHandler = () => {
        if (props.teams) {
            mainPageScreenContext.onScreenChanged({ screen: SCREENS.Teams, data: props.teams });
            return;
        }
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.TournamentData, data: { id: props.id, date: props.date.date, teams: props.teams } });
    };

    function getDayName(dateStr, locale) {
        var date = dateStr;
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    function onMouseHover() {
        setMouseHover(true);
    };

    function onMouseLeave() {
        setMouseHover(false);
    }

    async function removeDateHandler() {
        await deleteTournament(props.id);
        const tournaments = await getAllTournaments();
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.TournamentPreview, data: tournaments });
    };

    return (
        <div className='parent' onMouseEnter={onMouseHover} onMouseLeave={onMouseLeave}>
            <Card>
                {userContext.user.isAdmin && isMouseHover && <div ><FaTrashRestoreAlt onClick={removeDateHandler} className="trash-icon" /></div>}
                <div className="regular-text">{getDayName(props.date.date, 'en-us')}</div>

                <div className="date-rubplic">
                    <label className="date-label">{props.date.date.getDate().toString().padStart(2, '0')}</label>
                    <div className="date-rublic-devider" />
                    <label className="date-label">{(props.date.date.getMonth() + 1).toString().padStart(2, '0')}</label>
                    <div className="date-rublic-devider" />
                    <label className="date-label">{props.date.date.getFullYear()}</label>
                </div>

                <div className="regular-text">Goaltime Kfar-Saba</div>

                <div className="time">{props.date.time.getHours().toString().padStart(2, '0')}:{props.date.time.getMinutes().toString().padStart(2, '0')}</div>

                <div className='button-container'>
                    <Button onClick={showTournamentHandler} className='play-button'>Show</Button>
                </div>
            </Card>
        </div>
    );
}

export default TournamentPreview;
import { useContext, useState } from "react";
import { UserContext } from "../../Store/UserContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import './TournamentDate.css';

import { FaTrashRestoreAlt } from 'react-icons/fa';

function TournamentDate(props) {
    
    
    const [isMouseHover, setMouseHover] = useState(false);
    const userContext = useContext(UserContext);

    const registerHandler = () => {
        props.onGoToParticipants(props.id,props.date.date, props.isLocked);
    };

    function getDayName(dateStr, locale)
    {
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
        props.onRemoveDate(props.id);
    };
    
    return (
        <div className='parent' onMouseEnter={onMouseHover} onMouseLeave={onMouseLeave}>
            <Card>
                { userContext.user.isAdmin && isMouseHover && <div ><FaTrashRestoreAlt onClick={removeDateHandler} className="trash-icon" /></div> }
                <div className="regular-text">{getDayName(props.date.date, 'en-us')}</div>

                <div className="date-rubplic">
                    <label className="date-label">{props.date.date.getDate().toString().padStart(2,'0')}</label>
                    <div className="date-rublic-devider"/>
                    <label  className="date-label">{(props.date.date.getMonth()+1).toString().padStart(2,'0')}</label>
                    <div className="date-rublic-devider"/>
                    <label  className="date-label">{props.date.date.getFullYear()}</label> 
                </div>

                <div className="regular-text">Goaltime Kfar-Saba</div>

                <div className="time">{props.date.time.getHours().toString().padStart(2, '0')}:{props.date.time.getMinutes().toString().padStart(2, '0')}</div>

                <div className='button-container'>
                    <Button onClick={registerHandler} className='play-button'>Show</Button>
                </div>


            </Card>
        </div>
    );
}

export default TournamentDate;
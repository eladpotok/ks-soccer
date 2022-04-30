import { useContext } from "react";
import { UserContext } from "../../Store/UserContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import './TournamentDate.css'

function TournamentDate(props) {
    
    const userContext = useContext(UserContext);

    const registerHandler = () => {
        props.onGoToParticipants(props.id);
    };
    
    return (
        <div className='parent'>
            <Card className='tournament'>

               <div className='header'>Next Soccer Evening:</div>
               <div className='date-info'>
                    <div className='date-header'>
                        <div className='month'>{props.date.month}</div>
                        <div className='year'>{props.date.year}</div>
                    </div>

                    <div className='day'>
                        <div>{props.date.day}</div>
                        <div className='divider'></div>
                        <div className='time'>{props.date.time}</div>
                    </div>
                </div>

                <div className='button-container'>
                    {userContext.isAuthorized && <Button onClick={registerHandler} className='button'>הרשמה</Button>}
                </div>
            </Card>
        </div>
    );
}

export default TournamentDate;
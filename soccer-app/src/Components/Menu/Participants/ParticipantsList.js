import Stars from '../../UI/Stars';
import './ParticipantsList.css'

function ParticipantsList(props) {

    const players = props.players;

    return (
        <>
            <div>
                {players.map( (player) => 
                    <div key={player.id}>
                        <div className='row'>
                            <div className='player-name'>{player.name}</div>
                            <div>
                            <Stars stars={player.stars}/>
                            </div>
                        </div>
                        <div className='divider'/>
                    </div>
                )}
            </div>
            <div className='hard-divider'/>
        </>
    );

}

export default ParticipantsList;
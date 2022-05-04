import { Button, Card } from "antd";
import { useState } from "react";
import { setPlayerStars } from "../../Adapters/TournamentPlayersProvider";
import { SingleStar } from "../UI/Stars";
import './PlayersList.css'

function PlayersList(props) {

    const [playersList, setPlayersList] = useState(props.players);
    function playerStarsEditHandler(playerToEdit) {
        const newList = playersList.map((player) => {
            if (player.id === playerToEdit.id) {
              const updatedItem = {
                ...player,
                stars: playerToEdit.stars,
              };
      
              return updatedItem;
            }
      
            return player;
          });
      
          setPlayerStars(playerToEdit.id, playerToEdit.stars);
          setPlayersList(newList);
    }

    return <>
        <Card title='Players'>
            {props.players.map(player => (
                <div className="player-row">
                    <div className="player-name">{player.name} &nbsp;&nbsp; &nbsp;&nbsp; </div>
                    <input defaultValue={player.stars} type='number' max='5' min='2'   onChange={ (event) => {
                        player.stars = event.target.value
                    }}/>
                    <SingleStar className='player-star' />
                    <Button onClick={()=> playerStarsEditHandler(player)}>Save</Button>
                </div>
            ))}
        </Card>
    </>
}


export default PlayersList;
import ParticipantsList from "../Menu/Participants/ParticipantsList";
import {FaTshirt , FaShirtsinbulk} from 'react-icons/fa';
import {IoShirtOutline} from 'react-icons/io5';
import './Group.css'
import { Card, Checkbox, Skeleton } from "antd";
import Stars from "../UI/Stars";
import { useContext } from "react";
import { UserContext } from "../../Store/UserContext";
import { checkIsAdmin } from "../../Utils/commonUtils";
import { changePlayersInTeam } from "../../Adapters/TournamentPlayersProvider";

function Group(props) {
    const userContext = useContext(UserContext);

    const groupPlayers = props.players;

    const classes = props.className;

    const shirtClass = 'shirt-' + props.color;
    
    const onCheckboxChangedHandler = async(playerId, e) => {
        props.onPlayerPaid(playerId, e.target.checked);
    }

    function movePlayerToTeamHandler(player, moveFrom, moveTo) {

      

        props.onRefreshGroups(player, moveFrom, moveTo);
    }

    return (
        
        <div className={classes}>
            <Card >
                <div className="group-header">
                    { shirtClass == 'shirt-white' && <div className={shirtClass}><IoShirtOutline className="shirt-icon"/></div>}
                    { shirtClass != 'shirt-white' && <div className={shirtClass}><FaTshirt className="shirt-icon"/></div>}
                    &nbsp;&nbsp; Team {props.teamId}
                </div>

                <div>
                {groupPlayers.map((player) =>

                    
                    <Skeleton style={{ height: '10px' }} loading={props.isLoading} active>
                        <div key={player.id}>
                            <div className='row'>
                                <div className='player-name' >
                                    {checkIsAdmin(userContext.user.isAdmin) && <Checkbox defaultChecked={player.paid} onChange={(e) => {onCheckboxChangedHandler(player.id, e);}}> </Checkbox>}
                                    {player.name}
                                </div>
                                <div>
                                    <Stars stars={player.stars} />
                                    {checkIsAdmin(userContext.user.isAdmin) && props.levelType && <label style={{ borderStyle: 'solid', borderRadius: '10px', opacity: '0.7' , borderWidth: '1px', borderColor: 'grey',  marginLeft: '4px', marginRight: '4px' }} />}
                                    
                                    {getOtherTeams(props.teamId).map( (team)=> (
                                        <button disabled={groupPlayers.length === 1} className="move-to-group" onClick={() => movePlayerToTeamHandler(player, props.teamId, team)}>{team}</button>
                                    ))}
                                </div>
                            </div>
                            <div className='divider-player-list' />
                        </div>
                    </Skeleton>

                )}
            </div>

                {/* <ParticipantsList showPaid={true} color='black' allowRemove={false} players={groupPlayers}/> */}
            </Card>
        </div>
    );

}

function getOtherTeams(myTeamId) {
    const teams = ['A', 'B', 'C'];
    return teams.filter(t=> t !== myTeamId);
}

export default Group;
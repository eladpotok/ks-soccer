import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { setPlayerPaid } from "../../Adapters/TournamentPlayersProvider";
import { setPlayersInTeam, getTeamsByTournamentId } from "../../Adapters/TournamentTeamsProvider";
import { arrayToObject, objectToArray } from "../../Utils/commonUtils";
import { BOOL_TO_LEVEL_TYPE } from "../../Utils/consts";
import { makeGroups } from "../../Utils/makeGroups";
import Group from "./Group";

import './TeamsDistribution.css'


function TeamsDistribution(props) {

    const [ teams, setTeams  ] = useState(null);
    const groupClass = !isMobile ? 'group-desktop' : 'group-mobile';
    const groupContainerClass = !isMobile ? 'group-Container' : 'group-Container-mobile';

    useEffect(() => { 
        (async () => { 
            if (!teams) {
                const teamsFromDb = await getTeamsByTournamentId(props.tournamentId);
                if(!teamsFromDb) {
                    return;
                }
                setTeams(teamsFromDb);
            }
        })() 
      }, [teams])

    const dbDisplayToPageDisplay = {
        'A': 0,
        'B': 1,
        'C': 2
    };

    const movePlayerToGroup = async (player, moveFrom, moveTo) => {
        const teamFromId = dbDisplayToPageDisplay[moveFrom];
        const teamToId = dbDisplayToPageDisplay[moveTo];

        const playersFrom = objectToArray(teams[teamFromId].players).filter( pl => pl.userId !== player.userId);
        const playersTo = objectToArray(teams[teamToId].players).concat([player]);

        console.log('players from', playersFrom);
        console.log('players to', playersTo);
        
        await setPlayersInTeam(props.tournamentId, teamFromId,  arrayToObject(playersFrom));
        await setPlayersInTeam(props.tournamentId, teamToId, arrayToObject(playersTo));
        await fetchTeams();
    };

    const playerPaidHandler = async(playerId, teamId, paid) => {
        await setPlayerPaid(playerId, props.tournamentId, dbDisplayToPageDisplay[teamId] ,  paid);
        await fetchTeams();
    }

    const fetchTeams = async() => {
        const teamsFromDb = await getTeamsByTournamentId(props.tournamentId);
        setTeams(teamsFromDb);
    }

    return (
        <div>
            <div className="distribution-title">
                Players
            </div>
           {teams && <div className={groupContainerClass} >
                <Group onPlayerPaid={playerPaidHandler}  onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} className={groupClass} players={teams[0].players} teamId='A' color={teams[0].color} />
                <Group onPlayerPaid={playerPaidHandler}  onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} className={groupClass} players={teams[1].players} teamId='B' color={teams[1].color} />
                <Group onPlayerPaid={playerPaidHandler}  onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} className={groupClass} players={teams[2].players} teamId='C' color={teams[2].color} />
            </div>}
        </div>
    );
}


export default TeamsDistribution;
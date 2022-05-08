import { useState } from "react";
import { isMobile } from "react-device-detect";
import { changePlayersInTeam, getTeams, setPlayerPaid } from "../../Adapters/TournamentPlayersProvider";
import { arrayToObject, objectToArray } from "../../Utils/commonUtils";
import { makeGroups } from "../../Utils/makeGroups";
import Group from "./Group";

import './TeamsDistribution.css'

function TeamsDistribution(props) {

    const [ teams, setTeams  ] = useState(props.teams);
    const groupClass = !isMobile ? 'group-desktop' : 'group-mobile';
    const groupContainerClass = !isMobile ? 'group-Container' : 'group-Container-mobile';

    const dbDisplayToPageDisplay = {
        'A': 0,
        'B': 1,
        'C': 2
    };

    const movePlayerToGroup = async (player, moveFrom, moveTo) => {
        const teamFromId = dbDisplayToPageDisplay[moveFrom];
        const teamToId = dbDisplayToPageDisplay[moveTo];
        
        const tournamentLevel = props.isHigh ? 'teamsHigh' : 'teamsLow';

        const playersFrom = objectToArray(teams[teamFromId].players).filter( pl => pl.id !== player.id);
        const playersTo = objectToArray(teams[teamToId].players).concat([player]);
        
        await changePlayersInTeam(props.tournamentId, tournamentLevel, teamFromId,  arrayToObject(playersFrom));
        await changePlayersInTeam(props.tournamentId, tournamentLevel, teamToId, arrayToObject(playersTo));
        await fetchTeams();
    };

    const playerPaidHandler = async(playerId, teamId, paid) => {
        await setPlayerPaid(playerId, props.tournamentId, props.isHigh ? 'teamsHigh' : 'teamsLow', dbDisplayToPageDisplay[teamId] ,  paid);
        await fetchTeams();
    }

    const fetchTeams = async() => {
        const teamsFromDb = await getTeams(props.tournamentId);
        const teamsAccordingToLevel = props.isHigh ? teamsFromDb.teamsHigh : teamsFromDb.teamsLow;
        setTeams(teamsAccordingToLevel);
    }


    return (
        <div>
            <div className="distribution-title">
                {props.isHigh ? "סבירים" : "גרועים"}
            </div>
            <div className={groupContainerClass} >
                <Group onPlayerPaid={playerPaidHandler} onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} isHigh={props.isHigh} className={groupClass} players={teams[0].players} teamId='A' color={teams[0].color} />
                <Group onPlayerPaid={playerPaidHandler}  onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} isHigh={props.isHigh} className={groupClass} players={teams[1].players} teamId='B' color={teams[1].color} />
                <Group onPlayerPaid={playerPaidHandler}  onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} isHigh={props.isHigh} className={groupClass} players={teams[2].players} teamId='C' color={teams[2].color} />
            </div>
        </div>
    );

}


export default TeamsDistribution;
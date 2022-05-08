import { useState } from "react";
import { isMobile } from "react-device-detect";
import { changePlayersInTeam, getTeams } from "../../Adapters/TournamentPlayersProvider";
import { makeGroups } from "../../Utils/makeGroups";
import Group from "./Group";

import './TeamsDistribution.css'

function TeamsDistribution(props) {

    const [ teams, setTeams  ] = useState(props.teams);
    console.log('props ', props.teams);
    const groupClass = !isMobile ? 'group-desktop' : 'group-mobile';
    const groupContainerClass = !isMobile ? 'group-Container' : 'group-Container-mobile';

    const movePlayerToGroup = async (player, moveFrom, moveTo) => {
        const dbDisplayToPageDisplay = {
            'A': 0,
            'B': 1,
            'C': 2
        };
        
        const teamFromId = dbDisplayToPageDisplay[moveFrom];
        const teamToId = dbDisplayToPageDisplay[moveTo];
        
        const tournamentLevel = props.isHigh ? 'teamsHigh' : 'teamsLow';

        const playersFrom = teams[teamFromId].players.filter( pl => pl.id !== player.id);
        const playersTo = teams[teamToId].players.concat([player]);
        
        await changePlayersInTeam(props.tournamentId, tournamentLevel, teamFromId, playersFrom);
        await changePlayersInTeam(props.tournamentId, tournamentLevel, teamToId, playersTo);

        const teamsFromDb = await getTeams(props.tournamentId);
        const teamsAccordingToLevel = props.isHigh ? teamsFromDb.teamsHigh : teamsFromDb.teamsLow;
        setTeams(teamsAccordingToLevel);
    };

    return (
        <div>
            <div className="distribution-title">
                {props.isHigh ? "סבירים" : "גרועים"}
            </div>
            <div className={groupContainerClass} >
                <Group onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} isHigh={props.isHigh} className={groupClass} players={teams[0].players} teamId='A' color={teams[0].color} />
                <Group onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} isHigh={props.isHigh} className={groupClass} players={teams[1].players} teamId='B' color={teams[1].color} />
                <Group onRefreshGroups={movePlayerToGroup} tournamentId={props.tournamentId} isHigh={props.isHigh} className={groupClass} players={teams[2].players} teamId='C' color={teams[2].color} />
            </div>
        </div>
    );

}


export default TeamsDistribution;
import { isMobile } from "react-device-detect";
import { makeGroups } from "../../Utils/makeGroups";
import Group from "./Group";

import './TeamsDistribution.css'

function TeamsDistribution(props) {

    const teams = props.teams;

    const groupContainerClass = !isMobile ? 'teams-card' :  null;
    const groupClass  = !isMobile ? 'group-desktop' :  'group-mobile';
    
    return (
        <div className={groupContainerClass}>
            <Group className={groupClass}  players={teams[0].players} teamId='A' color={teams[0].color}/>
            <Group className={groupClass} players={teams[1].players} teamId='B' color={teams[1].color}/>
            <Group className={groupClass}  players={teams[2].players} teamId='C' color={teams[2].color}/>
        </div>
    );

}


export default TeamsDistribution;
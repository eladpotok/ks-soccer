import { isMobile } from "react-device-detect";
import { makeGroups } from "../../Utils/makeGroups";
import Group from "./Group";

import './TeamsDistribution.css'

function TeamsDistribution(props) {

    const teams = props.teams;

    const groupClass = !isMobile ? 'group-desktop' : 'group-mobile';

    return (
        <div>
            <div className="distribution-title">
                {props.isHigh ? "סבירים" : "גרועים"}
            </div>
            <div style={{ display: 'flex' }} >
                <Group className={groupClass} players={teams[0].players} teamId='A' color={teams[0].color} />
                <Group className={groupClass} players={teams[1].players} teamId='B' color={teams[1].color} />
                <Group className={groupClass} players={teams[2].players} teamId='C' color={teams[2].color} />
            </div>
        </div>
    );

}


export default TeamsDistribution;
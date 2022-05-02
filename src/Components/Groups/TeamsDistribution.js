import { makeGroups } from "../../Utils/makeGroups";
import Group from "./Group";

import './TeamsDistribution.css'

function TeamsDistribution(props) {

    const teams = props.teams;
    let colors = [ 'blue', 'orange' , 'green' ] 
    
    function getColor() {
        const color = colors[Math.floor(Math.random() * colors.length)];
        colors = colors.filter ( c => c != color);
        return color;
    }

    return (
        <div className="teams-card">
            <Group className='group' players={teams[0]} teamId='A' color={getColor()}/>
            <Group className='group' players={teams[1]} teamId='B' color={getColor()}/>
            <Group className='group' players={teams[2]} teamId='C' color={getColor()}/>
        </div>
    );

}


export default TeamsDistribution;
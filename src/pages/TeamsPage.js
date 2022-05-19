import { useParams } from "react-router-dom";
import TeamsDistribution from "../Components/Groups/TeamsDistribution";

import './TeamsPage.css';

function TeamsPage() {
    const params = useParams();
    const groupContainerClass = 'teams-card' ;

    return (<div className={groupContainerClass}>
        <div className='teams'><TeamsDistribution tournamentId={params.tournamentId} isHigh={true}/></div>
        <div className='teams'><TeamsDistribution tournamentId={params.tournamentId} isHigh={false}/></div>
    </div>)
}

export default TeamsPage;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getPlayersFromTournament from "../Adapters/TournamentPlayersProvider";
import { saveTeams } from "../Adapters/TournamentTeamsProvider";
import TournamentData from "../Components/Menu/Participants/TournamentData";
import {  PlayersContextProvider } from "../Store/PlayersContext";

function TournamentDataPage() {
    const params = useParams();
    const navigate = useNavigate();

    
    // if(!params.tournamentId) {
    //     history.replace('/notFound')
    //     return;
    // }

    return <div >
        <PlayersContextProvider id={params.tournamentId}>
            <TournamentData id={params.tournamentId} />
        </PlayersContextProvider>
    </div>

}

export default TournamentDataPage;
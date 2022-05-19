import { List, Skeleton, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTournaments } from "../Adapters/TournamentPlayersProvider";
import TournamentPreview from "../Components/Menu/TournamentPreview";
import LoadingComponent from "../Components/UI/LoadingComponent";

function TournamentsPage() {

    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => { 
        setLoading(true);
        (async () => { 
            if (!tournaments) {
                let tournaments = await getAllTournaments();
                setTournaments(tournaments);
            }
            setLoading(false);
        })() 
      }, [tournaments])


    function moveToTournamentPageHandler(tournamentId) {
        navigate(`/tournaments/${tournamentId}`)
    }

    return (<>
        <LoadingComponent isLoading={isLoading}>
            <div>
                {tournaments && <List grid='{gutter: 1, column: 1}' 
                loading={isLoading}
                    itemLayout="vertical"
                    dataSource={tournaments}
                    renderItem={item => (
                        <List.Item>
                            {<TournamentPreview onMoveToTournament={moveToTournamentPageHandler} title={item.title} date={item} key={item.id} id={item.id} teams={item.teams} />}
                        </List.Item>
                    )}
                />}
                {tournaments && tournaments.length === 0 && <div className='no-tournaments'>no tournaments next</div>}
            </div>
        </LoadingComponent>
    </>)
}

export default TournamentsPage;
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import TournamentDate from './Components/Menu/TournamentDate';
import Participants from './Components/Menu/Participants/Participants';
import Header from './Components/Header/Header';
import { UserContextProvider } from './Store/UserContext';
import User from './Components/User/User';
import AddTournament from './Admin/AddTournament';
import { addTournament, deleteTournament, getTournaments, saveTeams, setTournamentTeamsDistributed } from './Adapters/TournamentPlayersProvider';
import { makeGroups } from './Utils/makeGroups';
import TeamsDistribution from './Components/Groups/TeamsDistribution';

function App() {
  
  

  const [isParticipantsScreen, setParticipantsScreen] = useState(null);
  const [isLoadingTournaments, setLoadingTournaments] = useState(true);
  const [teamsScreen, setTeamsScreen ] = useState('');
  

  const goToParticipantsHandler = (id, date, isLocked, teams) => {
    console.log('app.js, teams = ' , teams);
    if(teams) {
      setTeamsScreen(teams);  
    }
    else{
      setTeamsScreen(null);
      setParticipantsScreen({id, date, isLocked, teams});
    }

  };
  
  const goHomePageHandler = () => {
    setTeamsScreen(null);

    setParticipantsScreen(null);
  };
  
  const tournamentAddedHandler = async (date, time) => {
    
    await addTournament(date, time);
    getTournamentsFromDbHandler();
  };

  const [tournaments, setTournaments] = useState(null);
  useEffect( ()=> {
    getTournamentsFromDbHandler();
  }, [isParticipantsScreen]);

  const tournamentDeletedHandler = async (id) => {
    await deleteTournament(id);
    await getTournamentsFromDbHandler();
  };

  const getTournamentsFromDbHandler = async () => {
    let  tournaments = await getTournaments();

    setTournaments(tournaments);
    setLoadingTournaments(false);
  };

  async function showTeamsHandler(teams, tournamentId) { 
    setParticipantsScreen(null);
    setTeamsScreen(teams);
    await saveTeams(tournamentId, teams);
  }
  
  return (
    <UserContextProvider>
      <Header onGoHomePage={goHomePageHandler} />
      <div className='page'>
        { !isLoadingTournaments && <div className='teams'>
          { teamsScreen && <TeamsDistribution teams={teamsScreen} ></TeamsDistribution>}
        {isParticipantsScreen === null &&   
          <div className="App" >
           { (tournaments === null || tournaments.length === 0) &&<div className='no-tournaments'>no tournaments next</div>} 
          { !teamsScreen && tournaments && tournaments.map( (data) => 
                      <div >
                        
                          <TournamentDate onRemoveDate={tournamentDeletedHandler} onGoToParticipants={goToParticipantsHandler} className='tournament' date={data} id={data.id} isLocked={data.isLocked} teams={data.teams}></TournamentDate>
                      </div>
                  )}
          </div>}
          {isParticipantsScreen !== null &&   
          <div className='participants' >
            <Participants onShowTeams={showTeamsHandler} date={isParticipantsScreen.date} id={isParticipantsScreen.id} isLocked={isParticipantsScreen.isLocked} />
          </div>}
          <div  >
            
          </div>
        </div>}
        
        <div className='footer-page'>{!isParticipantsScreen && <User />}</div>
        <div className='footer-page'><AddTournament  onTournamentAdded={tournamentAddedHandler}/></div>
      </div>


    </UserContextProvider>
  );
}

export default App;

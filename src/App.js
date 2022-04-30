import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import TournamentDate from './Components/Menu/TournamentDate';
import Participants from './Components/Menu/Participants/Participants';
import Register from './Components/User/Register';
import Header from './Components/Header/Header';
import { UserContextProvider } from './Store/UserContext';
import User from './Components/User/User';
import AddTournament from './Admin/AddTournament';
import { addTournament, deleteTournament, getTournaments } from './Adapters/TournamentPlayersProvider';

function App() {
  
  const [isParticipantsScreen, setParticipantsScreen] = useState(null);

  const dummy1 = {
    date: new Date(2022, 4, 1, 21, 30)
  };

  const dummy2 = {
    date: new Date(2022,4, 5, 21, 30)
  };
  


  const goToParticipantsHandler = (id, date, isLocked) => {
    setParticipantsScreen({id, date, isLocked});
  };
  
  const goHomePageHandler = () => {
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

    console.log(tournaments);
    setTournaments(tournaments);
  };
  
  return (
    <UserContextProvider>
      <Header onGoHomePage={goHomePageHandler} />
      <div className='page'>
        <div>
        {isParticipantsScreen === null &&   
          <div className="App" >
          {/* { (tournaments === null || tournaments.length === 0) &&<div>no tournaments next</div>} */}
          { tournaments && tournaments.map( (data) => 
                      <div >
                        
                          <TournamentDate onRemoveDate={tournamentDeletedHandler} onGoToParticipants={goToParticipantsHandler} className='tournament' date={data} id={data.id} isLocked={data.isLocked} ></TournamentDate>
                      </div>
                  )}
          </div>}
          {isParticipantsScreen !== null &&   
          <div className='participants' >
            <Participants date={isParticipantsScreen.date} id={isParticipantsScreen.id} isLocked={isParticipantsScreen.isLocked} />
          </div>}
          <div  >
            {!isParticipantsScreen && <User />}
          </div>
        </div>
        <div className='footer-page'><AddTournament  onTournamentAdded={tournamentAddedHandler}/></div>
      </div>


    </UserContextProvider>
  );
}

export default App;

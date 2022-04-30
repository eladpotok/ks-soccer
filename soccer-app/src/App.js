import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import TournamentDate from './Components/Menu/TournamentDate';
import Participants from './Components/Menu/Participants/Participants';
import Register from './Components/User/Register';
import Header from './Components/Header/Header';
import { UserContextProvider } from './Store/UserContext';
import User from './Components/User/User';

function App() {
  
  const [isParticipantsScreen, setParticipantsScreen] = useState(null);

  const dummy1 = {
    day: 1,
    year: 22,
    month: 'MAY',
    time: '21:30'
  };

  const dummy2 = {
    day: 5,
    year: 22,
    month: 'MAY',
    time: '21:30'
  };


  const goToParticipantsHandler = (id, date) => {
    setParticipantsScreen({id, date});
  };
  
  
  return (
    <UserContextProvider>
      <Header/>
      {isParticipantsScreen === null &&   
        <div className="App" >
          <TournamentDate onGoToParticipants={goToParticipantsHandler} className='tournament' date={dummy1} id='1' ></TournamentDate>
          <TournamentDate onGoToParticipants={goToParticipantsHandler} className='tournament' date={dummy2} id='2' ></TournamentDate>
        </div>}
        {isParticipantsScreen !== null &&   
        <div className='participants' >
          <Participants date={isParticipantsScreen.date} id={isParticipantsScreen.id} />
        </div>}
        <div className="App" >
          <User />
        </div>

    </UserContextProvider>
  );
}

export default App;

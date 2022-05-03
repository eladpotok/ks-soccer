import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import TournamentDate from './Components/Menu/TournamentDate';
import Participants from './Components/Menu/Participants/Participants';
import Header from './Components/Header/Header';
import { UserContextProvider } from './Store/UserContext';
import User from './Components/User/User';
import AddTournament from './Admin/AddTournament';
import { addTournament, deleteTournament, getAllTournaments, saveTeams, setTournamentTeamsDistributed } from './Adapters/TournamentPlayersProvider';
import { makeGroups } from './Utils/makeGroups';
import TeamsDistribution from './Components/Groups/TeamsDistribution';
import MainPage from './Components/Menu/MainPage';
import { MainPageContextProvider } from './Store/MainPageContext';

function App() {
  return (
    <UserContextProvider>
      <MainPageContextProvider>
      <Header/>
      <div className='page'>
            <MainPage/>
        <div className='footer-page'> <User /></div>
        <div className='footer-page'><AddTournament /></div> 
      </div>
      </MainPageContextProvider>
    </UserContextProvider>
  );
}

export default App;

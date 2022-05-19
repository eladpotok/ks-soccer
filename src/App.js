import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import { UserContextProvider } from './Store/UserContext';
import User from './Components/User/User';
import MainPage from './Components/Menu/MainPage';
import { MainPageContextProvider } from './Store/MainPageContext';
import AdminPanel from './Components/Admin/AdminPanel';

import { Routes, Route, Navigate } from 'react-router-dom';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDataPage from './pages/TournamentDataPage';
import PageNotFound from './pages/PageNotFound';
import AdminWrapper from './Components/UI/AdminWrapper';
import AdminPage from './pages/AdminPage';
import EditUserPage from './pages/EditUserPage';
import TeamsPage from './pages/TeamsPage';
import { GENERATE_DEMO_DB, IS_DEMO } from './Adapters';
import { seedDemo } from './Adapters/TournamentPlayersProvider';

function App() {


  if(!GENERATE_DEMO_DB) { 
    seedDemo();    
  }

  return (
    <UserContextProvider>
      <MainPageContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/tournaments'/>}/>
          <Route path='/tournaments' element={<TournamentsPage />}/>
          <Route path='/tournaments/:tournamentId' element={<TournamentDataPage/>}/>
          <Route path='/tournaments/:tournamentId/teams' element={<TeamsPage/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          <Route  path='/admin' element={<AdminPage/>} />
          <Route  path='/editUser' element={<EditUserPage/>} />
        </Routes>
        <div className='page'>
          {/* <MainPage /> */}
          <div className='footer-page'> <User /></div>
          {/* <div className='footer-page'><AdminPanel /></div> */}
        </div>
      </MainPageContextProvider>
    </UserContextProvider>
  );
}

export default App;

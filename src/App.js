import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import { MainPageContextProvider } from './Store/MainPageContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDataPage from './pages/TournamentDataPage';
import AdminPage from './pages/AdminPage';
import EditUserPage from './pages/EditUserPage';
import TeamsPage from './pages/TeamsPage';
import { GENERATE_DEMO_DB, IS_DEMO } from './Adapters';
import { seedDemo } from './Adapters/TournamentPlayersProvider';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import FillDetails from './pages/FillDetails';

function App() {


  if (GENERATE_DEMO_DB) {
    seedDemo();
  }




  return (
    <>
      <MainPageContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/tournaments' />} />
          <Route path='/tournaments' element={<TournamentsPage />} />
          <Route path='/tournaments/:tournamentId' element={<TournamentDataPage />} />
          <Route path='/tournaments/:tournamentId/teams' element={<TeamsPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/editUser' element={<EditUserPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/fillDetails/:userId' element={<FillDetails />} />
          {/* <Route path='*' element={<PageNotFound/>}/> */}
        </Routes>
      </MainPageContextProvider>
    </>
  );
}

export default App;

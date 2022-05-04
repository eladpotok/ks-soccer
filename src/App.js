import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import { UserContextProvider } from './Store/UserContext';
import User from './Components/User/User';
import MainPage from './Components/Menu/MainPage';
import { MainPageContextProvider } from './Store/MainPageContext';
import AdminPanel from './Components/Admin/AdminPanel';

function App() {
  return (
    <UserContextProvider>
      <MainPageContextProvider>
        <Header />
        <div className='page'>
          <MainPage />
          <div className='footer-page'> <User /></div>
          <div className='footer-page'><AdminPanel /></div>
        </div>
      </MainPageContextProvider>
    </UserContextProvider>
  );
}

export default App;

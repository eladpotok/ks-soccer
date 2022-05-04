import { useContext } from 'react';
import { Card, Collapse, Divider } from 'antd';
import { getAllPlayers } from '../../Adapters/TournamentPlayersProvider';
import { MainPageContext, SCREENS } from '../../Store/MainPageContext';
import { UserContext } from '../../Store/UserContext';
import AddTournament from './AddTournament';
import { FaUserEdit } from 'react-icons/fa';


import './AdminPanel.css'

function AdminPanel(props) {
    const userContext = useContext(UserContext);
    const mainPageContext = useContext(MainPageContext);

    async function moveToPlayersListPageHandler() {
        const players = await getAllPlayers();
        mainPageContext.onScreenChanged({ screen: SCREENS.PlayersList, data: players });
    }
    const { Panel } = Collapse;

    return (<>
        {userContext.user.isAdmin &&
            <Collapse>
                <Panel header="Admin Panel">
                    <Card >
                        <div onClick={moveToPlayersListPageHandler}><FaUserEdit /> <label className='label-link'>Edit Players</label></div>
                        <Divider />
                        <div ><AddTournament /></div>
                    </Card>
                </Panel>
            </Collapse>}
    </>);

}


export default AdminPanel;
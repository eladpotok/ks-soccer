import { Tabs } from 'antd';
import AddTournament from './AddTournament';
import PlayersList from './PlayersList';
import './AdminPanel.css'

const { TabPane } = Tabs;

function AdminPanel(props) {
    return (<Tabs defaultActiveKey="1">
        <TabPane tab="Add Tournament" key="1">
            <AddTournament/>
        </TabPane>
        <TabPane tab="Edit Users" key="2">
            <PlayersList/>
        </TabPane>
    </Tabs>);
}

export default AdminPanel;
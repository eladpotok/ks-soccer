import { useContext } from "react";
import { UserContext } from "../../Store/UserContext";
import Login from "./Login";
import Register from "./Register";
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import './User.css'
const { TabPane } = Tabs;
function User(props) {

    const userContext = useContext(UserContext);

    return (
        <>
        { !userContext.user.username && <div className="user-tabs">
            <Tabs defaultActiveKey="1" >
                <TabPane tab='Register' key='1' className="user-tab">
                    <Register/>
                </TabPane>
                <TabPane tab='Login' key='2'>
                    <Login/>
                </TabPane>
            </ Tabs>    
        </div>}
        </>
    );

}


export default User;
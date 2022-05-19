import { BiLogOut } from 'react-icons/bi';
import { AiTwotoneHome } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Store/UserContext";
import './Header.css'
import { MainPageContext, SCREENS } from '../../Store/MainPageContext';
import { Button, Input, Select } from 'antd';
import { GROUP_TYPE } from '../../Utils/makeGroups';
import { preferenceDbNameToDisplayName, preferenceDisplayNameToDbName } from '../../Utils/commonUtils';
import { isMobile } from 'react-device-detect';
import AdminWrapper from '../UI/AdminWrapper';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function Header(props) {

    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    let usernameDisplay = 'guest';

    if (userContext.user.username) {
        usernameDisplay = userContext.user.username;
    }

    const logoutHandler = () => {
        userContext.onLogout();
        navigate('/');
    };

    function homeClickedHandler() {
        navigate('/');
    }

    function onEditUserClickedHandler() {
        navigate('/editUser');
    }
    
    function onAdminPanelClickedHandler() {
        navigate('/admin');
    }

    return (
        <div className='header-panel'>
            <AiTwotoneHome onClick={homeClickedHandler} className='homeIcon' />
            Welcome <div className="username">{usernameDisplay}</div> {userContext.isAuthorized && !isMobile && <div>  &nbsp;&nbsp; (Level: {userContext.user.level})</div>}
            <div style={{  widows: '100%' , display: 'flex', flexDirection: 'row-reverse' }}>
                <div>
                    <AdminWrapper>
                        <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={onAdminPanelClickedHandler}>Admin</Button>
                    </AdminWrapper>
                </div>
                <div>{userContext.isAuthorized && <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={onEditUserClickedHandler}>Edit</Button>}</div>
                <div>{userContext.isAuthorized && <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={logoutHandler}>Logout</Button>}</div>
            </div>
        </div>
    );


}

export default Header;
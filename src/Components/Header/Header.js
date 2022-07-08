import { BiLogOut } from 'react-icons/bi';
import { AiTwotoneHome } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from "react";
import { AiFillHome } from 'react-icons/ai'

import { UserContext } from "../../Store/UserContext";
import { MainPageContext, SCREENS } from '../../Store/MainPageContext';
import { Button, Input, Select } from 'antd';
import { GROUP_TYPE } from '../../Utils/makeGroups';
import { preferenceDbNameToDisplayName, preferenceDisplayNameToDbName } from '../../Utils/commonUtils';
import { isMobile } from 'react-device-detect';
import AdminWrapper from '../UI/AdminWrapper';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css'
import AdminPage from '../../pages/AdminPage';

const { Option } = Select;

function Header(props) {

    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    let usernameDisplay = 'guest';

    // if (userContext.user.username) {
    //     usernameDisplay = userContext.user.username;
    // }

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

    function onRegisterClickedHandler() {
        navigate('/register');
    }

    function onLoginClickedHandler() {
        navigate('/login');
    }

    return (
        <div className='header-panel'>
            <Button onClick={homeClickedHandler} style={{marginTop: '6px', color: 'white',  marginLeft: '10px', background: 'transparent' , borderWidth: '0px'}} icon={<AiFillHome/>}/>
            { !userContext.user && userContext.tokenExists && <NavLink to='/register'>Fill Your Information</NavLink>}  
            {  !userContext.userExists && <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={onRegisterClickedHandler}>Register</Button>}
            {  !userContext.userExists && <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={onLoginClickedHandler}>Login</Button>}
            { userContext.user && userContext.tokenExists &&
                <div>
                    Hello {userContext.user.name} 
                    <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={onEditUserClickedHandler}>Edit</Button>
                    <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={logoutHandler}>Logout</Button>
                    <AdminWrapper>
                        <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={onAdminPanelClickedHandler}>Admin</Button>
                    </AdminWrapper>
                </div>
            }
        </div>
    );


}

export default Header;
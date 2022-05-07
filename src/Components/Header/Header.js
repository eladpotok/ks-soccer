import { BiLogOut } from 'react-icons/bi';
import { AiTwotoneHome } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Store/UserContext";
import './Header.css'
import { MainPageContext, SCREENS } from '../../Store/MainPageContext';
import { Button, Input, Select } from 'antd';
import { GROUP_TYPE } from '../../Utils/makeGroups';
import { preferenceDbNameToDisplayName, preferenceDisplayNameToDbName } from '../../Utils/commonUtils';

const { Option } = Select;

function Header(props) {

    const userContext = useContext(UserContext);
    const mainPageScreenContext = useContext(MainPageContext);

    let usernameDisplay = 'guest';

    if (userContext.user.username) {
        usernameDisplay = userContext.user.username;
    }

    const logoutHandler = () => {
        userContext.onLogout();
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.None });
    };

    function homeClickedHandler() {
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.None });
    }



    function onEditUserClickedHandler() {
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.EditUser });
    }

    return (
        <div className='panel'>
            <AiTwotoneHome onClick={homeClickedHandler} className='homeIcon' />
            {userContext.isAuthorized && <BiLogOut onClick={logoutHandler} className='logoutIcon' />} Welcome <div className="username">{usernameDisplay}</div> {userContext.isAuthorized && <div>  &nbsp;&nbsp; (Level: {userContext.user.level})</div>}
            {userContext.isAuthorized && <Button style={{marginTop: '4px', marginLeft: '10px'}} type="dashed" ghost onClick={onEditUserClickedHandler}>Edit</Button>}
        </div>
    );


}

export default Header;
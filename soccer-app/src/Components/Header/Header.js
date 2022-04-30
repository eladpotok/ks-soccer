import { useContext } from "react";
import { UserContext } from "../../Store/UserContext";
import './Header.css'

function Header(props) {

    const userContext = useContext(UserContext);

    let usernameDisplay = 'guest';
    
    if(userContext.user.username) {
        usernameDisplay = userContext.user.username;
    }
    
    return (
        <div className='panel'> 
            Welcome <div className="username">{usernameDisplay}</div> {userContext.isAuthorized && <div>  &nbsp;&nbsp; (Level: {userContext.user.level})</div>}
        </div>
    );


}

export default Header;
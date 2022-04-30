import { useContext } from "react";
import { UserContext } from "../../Store/UserContext";
import Login from "./Login";
import Register from "./Register";

function User(props) {

    const userContext = useContext(UserContext);

    return (
        <>
            <Register/>
            <Login/>
        </>    
    );

}


export default User;
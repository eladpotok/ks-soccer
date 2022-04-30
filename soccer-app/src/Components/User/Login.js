import { useContext, useRef } from "react";
import { login } from "../../Adapters/TournamentPlayersProvider";
import { UserContext } from "../../Store/UserContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import './Register.css'
function Login(props) {

    const userContext = useContext(UserContext);


    const name = useRef('');


    const loginHandler = async (event) => {
        event.preventDefault();

        const playerName = name.current.value;
        try {
            const loggedinUser = await login(playerName);
            if(loggedinUser) {
                userContext.onLogin(loggedinUser.name, loggedinUser.stars);
            }
        }
        catch {

        }
        
    };
    
    return (

        <>
        { userContext.user.username ? <div></div> : <Card className='register-card'>
        
            <form onSubmit={loginHandler}>
                <div>
                    <div>
                        <div className='item-title'>Your Name:</div>
                        <input ref={name}/>
                    </div>
                    <div>
                        <Button type='submit' className='join-button'>Login</Button>
                    </div>
                </div>
            </form>
        
        
        </Card>}
        </>

    );

}


export default Login;
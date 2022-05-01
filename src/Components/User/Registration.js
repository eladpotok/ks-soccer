import { useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

function Registration(props) {
    const name = useRef('');
    const level = useRef(2);

    const registerHandler = async (event) => {
        const playerName = name.current.value;
        const playerLevel = level.current.value;
        await props.onRegistered(playerName, playerLevel);
    };

    const loginHandler = async (event) => {
        await props.onLogin();
    };

return (
    <>
     <Card className='register-card'>
    
            <div>
                <div>
                    <div className='item-title'>Name:</div>
                    <input className="input" ref={name}/>
                </div>
                <div>
                    <div className='item-title'>Level:</div>
                    <input className="input" defaultValue='2' type='number' ref={level} step='0.5' max='5' />
                </div>
                <div className="join-button-container">
                    <Button onClick={registerHandler} className='join-button' type='submit' >Register</Button>
                    <Button onClick={loginHandler} className='join-button' type='submit' >Login</Button>
                </div>
            </div>
    
    
    </Card>
    </>);

}

export default  Registration;
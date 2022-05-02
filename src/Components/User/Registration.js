import { Card } from "antd";
import { useRef } from "react";
import Button from "../UI/Button";
import './Registration.css'

function Registration(props) {
    const name = useRef('');
    const level = useRef(2);

    const registerHandler = async (event) => {
        const playerName = name.current.value;
        const playerLevel = level.current.value;
        if(playerName === '') {
            alert('name can not be empty' );
            return;
        }
    
        await props.onRegistered(playerName, playerLevel);
    };

    const loginHandler = async (event) => {
        await props.onLogin();
    };

return (
    <>
     <Card className='register-card' title='Registration'>
    
            <div className="register-input">
                <div>
                    <div className='item-title'>Name:</div>
                    <input className="input" ref={name}/>
                </div>
                <div>
                    <div className='item-title'>Level:</div>
                    <input className="register-star-input" defaultValue='2' type='number' ref={level} step='0.5' max='5' />
                </div>
                <div className="join-button-container">
                    <Button onClick={registerHandler} className='register-button' type='submit' >Register</Button>
                    <Button onClick={loginHandler} className='register-button' type='submit' >Login</Button>
                </div>
            </div>
    
    
    </Card>
    </>);

}

export default  Registration;
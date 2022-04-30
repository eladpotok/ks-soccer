import { useContext, useRef, useState } from "react";
import { registerNewPlayer } from "../../Adapters/TournamentPlayersProvider";
import { UserContext } from "../../Store/UserContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import './Register.css'

function Register(props) {
    
    const userContext = useContext(UserContext);


    const name = useRef('');
    const level = useRef(2);


    const registerHandler = async (event) => {
        event.preventDefault();

         const playerName = name.current.value;
         const playerLevel = level.current.value;

         
         const isSuceeded = await registerNewPlayer({ id: 1212, name: playerName, stars: playerLevel })
         if(isSuceeded) {
             userContext.onLogin(playerName, playerLevel);
         }
    };
    
    return (

        <>
        { userContext.user.username ? <div></div> : <Card className='register-card'>
        
            <form onSubmit={registerHandler}>
                <div>
                    <div>
                        <div className='item-title'>Your Name:</div>
                        <input ref={name}/>
                    </div>
                    <div>
                        <div className='item-title'>Your Level:</div>
                        <input defaultValue='2' type='number' ref={level} step='0.5' max='5' />
                    </div>
                    <div>
                        <Button type='submit' className='join-button'>Register</Button>
                    </div>
                </div>
            </form>
        
        
        </Card>}
        </>

    );
}

export default Register;
import { React, useContext, useState } from "react";
import 'antd/dist/antd.css';

import Button from "../Components/UI/Button";
import { UserContext } from "../Store/UserContext";
import {  Card,  DatePicker, TimePicker } from "antd";
import { addTournament } from "../Adapters/TournamentPlayersProvider";
import { MainPageContext, SCREENS } from "../Store/MainPageContext";

function AddTournament(props) {

    const userContext = useContext(UserContext);
    const mainPageScreenContext = useContext(MainPageContext);

    let [selectedDate, setSelectedDate] = useState('');
    let [selectedTime, setSelectedTime] = useState(new Date(0,0,0,21,30,0,0));

    const addHandler = async (event) => {
        event.preventDefault();
        
        await addTournament(selectedDate, selectedTime);
        mainPageScreenContext.onScreenChanged({screen: SCREENS.None});
    };

    const dateChangedHandler = (date) => {
        setSelectedDate(new Date(date));
    };

    const timeChangedHandler = (time) => {
        setSelectedTime(new Date(time));
    };
    
    return <>
        {userContext.user.isAdmin && <Card  title="Admin Panel">
            <div >
             <form onSubmit={addHandler} > 
                <label>Enter Date  &nbsp;&nbsp;</label>
                <DatePicker onChange={dateChangedHandler}/>

                <label>&nbsp;&nbsp; &nbsp;&nbsp;Location: &nbsp;&nbsp;</label>
                <input defaultValue="Goaltime Kfar-Saba"></input>

                
                <label> &nbsp;&nbsp; &nbsp;&nbsp;Time: &nbsp;&nbsp;</label>
                <TimePicker  onChange={timeChangedHandler}/>

                <Button type="submit" >Add</Button>
             </form>
            </div>
        </Card>} 
    </>
}

export default AddTournament;
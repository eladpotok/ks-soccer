import { React, useContext, useState } from "react";
import 'antd/dist/antd.css';

import Button from "../Components/UI/Button";
import { UserContext } from "../Store/UserContext";
import {  Card,  DatePicker, TimePicker } from "antd";

function AddTournament(props) {

    const userContext = useContext(UserContext);

    let [selectedDate, setSelectedDate] = useState('');
    let [selectedTime, setSelectedTime] = useState(new Date(0,0,0,21,30,0,0));

    const addHandler = (event) => {
        event.preventDefault();
        props.onTournamentAdded(selectedDate, selectedTime);
    };

    const dateChangedHandler = (date) => {
        setSelectedDate(new Date(date));
    };

    const timeChangedHandler = (time) => {
        setSelectedTime(new Date(time));
    };
    console.log(userContext.user);
    return <>

{        userContext.user.isAdmin &&         <Card  title="Admin Panel">
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
        </div></Card>} 

    
    </>

}

export default AddTournament;
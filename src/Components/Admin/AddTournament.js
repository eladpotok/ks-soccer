import { React, useContext, useState } from "react";
import 'antd/dist/antd.css';
import { Button, Card, DatePicker, message, TimePicker } from "antd";
import { addTournament } from "../../Adapters/TournamentPlayersProvider";
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import './AddTournament.css'
import { MdTitle } from 'react-icons/md'
import {BsCalendarDate} from 'react-icons/bs'
import {AiOutlineFieldTime} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

function AddTournament(props) {

    const navigate = useNavigate();

    let [selectedDate, setSelectedDate] = useState('');
    let [selectedTime, setSelectedTime] = useState(new Date(0, 0, 0, 21, 30, 0, 0));
    const [tournamentTitle, setTournamentTitle] = useState('');

    const addHandler = async (event) => {

        if(!selectedDate || !selectedTime || !tournamentTitle)  {
            message.error('Please insert ');
        }

        await addTournament(selectedDate, selectedTime, tournamentTitle);
        navigate('/');
    };

    const dateChangedHandler = (date) => {
        setSelectedDate(new Date(date));
    };

    const timeChangedHandler = (time) => {
        setSelectedTime(new Date(time));
    };

    const titleChangedHandler = (title) => {
        setTournamentTitle(title.target.value);
    };

    return <div className="container">

        <form>
            <h4>Admin</h4>
            <div className='input-group input-group-icon'>
                <input type="text" placeholder="Tournament Title" onChange={titleChangedHandler} />

                <div className="input-icon"><MdTitle/></div>
            </div>
            <div className="input-group input-group-icon">
                <DatePicker style={{height: '50px' , width: '100%'}}  onChange={dateChangedHandler} />
                <div className="input-icon"><i className="fa fa-envelope"><BsCalendarDate/></i></div>
            </div>
            <div className="input-group input-group-icon">
                <TimePicker style={{ height: '50px' , width: '100%'}} onChange={timeChangedHandler} />
                <div className="input-icon"><AiOutlineFieldTime/></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button  style={{ height: '40px' }} onClick={addHandler} >Add</Button>
            </div>
        
        </form>
    </div>
}

export default AddTournament;
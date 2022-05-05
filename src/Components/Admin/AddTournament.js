import { React, useContext, useState } from "react";
import 'antd/dist/antd.css';
import { Button, Card, DatePicker, TimePicker } from "antd";
import { addTournament } from "../../Adapters/TournamentPlayersProvider";
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import './AddTournament.css'

function AddTournament(props) {

    const mainPageScreenContext = useContext(MainPageContext);

    let [selectedDate, setSelectedDate] = useState('');
    let [selectedTime, setSelectedTime] = useState(new Date(0, 0, 0, 21, 30, 0, 0));
    const [tournamentTitle, setTournamentTitle] = useState('');

    const addHandler = async (event) => {
        await addTournament(selectedDate, selectedTime, tournamentTitle);
        mainPageScreenContext.onScreenChanged({ screen: SCREENS.None });
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

    return <>
        <div >
            <form onSubmit={addHandler} >
                <label className="rublic-item">Title  &nbsp;&nbsp;</label>
                <input className="rublic-item" onChange={titleChangedHandler}></input>

                <br></br>

                <label className="rublic-item">Enter Date  &nbsp;&nbsp;</label>
                <DatePicker className="rublic-item" onChange={dateChangedHandler} />

                <label className="rublic-item">&nbsp;&nbsp; &nbsp;&nbsp;Location: &nbsp;&nbsp;</label>
                <input className="rublic-item" defaultValue="Goaltime Kfar-Saba"></input>


                <label className="rublic-item"> &nbsp;&nbsp; &nbsp;&nbsp;Time: &nbsp;&nbsp;</label>
                <TimePicker className="rublic-item" onChange={timeChangedHandler} />

                <Button onClick={addHandler} >Add</Button>
            </form>
        </div>
    </>
}

export default AddTournament;
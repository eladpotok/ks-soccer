import { Card,  DatePicker, TimePicker } from "antd";
import { useContext, useState } from "react";
import Button from "../Components/UI/Button";
import { UserContext } from "../Store/UserContext";

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
    console.log(userContext);
    
    return <>

    {userContext.user.isAdmin && <Card>
            <form onSubmit={addHandler}>
                <label>Enter Date  &nbsp;&nbsp;</label>
                <DatePicker onChange={dateChangedHandler}/>

                <label>&nbsp;&nbsp; &nbsp;&nbsp;Location: &nbsp;&nbsp;</label>
                <input defaultValue="Goaltime Kfar-Saba"></input>

                
                <label> &nbsp;&nbsp; &nbsp;&nbsp;Time: &nbsp;&nbsp;</label>
                <TimePicker onChange={timeChangedHandler}/>

                <Button type="submit" >Add</Button>

            </form>
        </Card>} 
    
    </>

}

export default AddTournament;
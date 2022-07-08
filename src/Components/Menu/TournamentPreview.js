import { useContext, useState } from "react";
import { UserContext } from "../../Store/UserContext";
import './TournamentPreview.css';

import { FaTrashRestoreAlt } from 'react-icons/fa';
import { MainPageContext, SCREENS } from "../../Store/MainPageContext";
import { deleteTournament, getAllTournaments } from "../../Adapters/TournamentPlayersProvider";
import { checkIsAdmin } from "../../Utils/commonUtils";
import { Avatar, Button, Card, Col, Popconfirm, Progress, Row } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { RiArrowRightSLine } from 'react-icons/ri';
import Meta from "antd/lib/card/Meta";
import { useHistory } from "react-router-dom";
import AdminWrapper from "../UI/AdminWrapper";
import { COLORS } from "../../Utils/consts";

function TournamentPreview(props) {
    const [isMouseHover, setMouseHover] = useState(false);
    const mainPageScreenContext = useContext(MainPageContext);
    const userContext = useContext(UserContext);

    const showTournamentHandler = () => {
        props.onMoveToTournament(props.id);
    };

    function getDayName(dateStr, locale) {
        var date = dateStr;
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    async function removeDateHandler(e) {
        e.stopPropagation();
        props.onDeleteTournament(props.id);
    };

    function ignoreDateClickingHandler(e) {
        e.stopPropagation();
    }

    const maxPlayers = 15;
    const playersCountPercentage = props.players ? (props.players?.length / maxPlayers) * 100 : 0;
    const avatar = `${process.env.PUBLIC_URL}/football-player.png`;
    return (
        <div className="tournament-card" onClick={showTournamentHandler}>


            <Progress type="circle" percent={playersCountPercentage} format={(percent) => <><div>{props.players?.length ?? 0}/{maxPlayers}</div> <div>Players</div></>} />

            <div className="tournament-date-day">{getDayName(props.date.date, 'en-us')}</div>
            <div className="tournament-date">{props.date.date.getDate().toString().padStart(2, '0') + "-" + (props.date.date.getMonth() + 1).toString().padStart(2, '0') + "-" + props.date.date.getFullYear()}</div>
            <div className="tournament-show-more">
                <div className="tournament-show-more-text">See more</div>
                <div className="tournament-arrow-right-icon">
                    <RiArrowRightSLine style={{ width: '25px', height: '25px' }} />
                </div>
            </div>

            <AdminWrapper>
                <div>
                    <Popconfirm title='Are you sure that you want to remove this tournament?' onCancel={ignoreDateClickingHandler} onClick={ignoreDateClickingHandler} onConfirm={removeDateHandler} >
                        <div className="tournament-delete" >Remove</div>
                    </Popconfirm>
                </div>
            </AdminWrapper>
        </div>
    );
}

export default TournamentPreview;
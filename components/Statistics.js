import { useState } from 'react';
import Chart from "react-google-charts";

import Loader from '../UI/icons/Loader';
import Views from '../UI/icons/Views';
import Like from '../UI/icons/Like';

export default function Statistics_component({views}) {
    const initialState = (true);
    const [state, setState] = useState(initialState);

    function viewsShow() {
        return (
            <div className="div">
                <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType="ColumnChart"
                    loader={<div> <Loader /></div>}
                    data={[
                        ['', 'Просмотров'],
                        ['23, Пн', 32],
                        ['24, ВТ', 8],
                        ['25, Ср', 6],
                        ['26, Чт', 3],
                        ['27, Пт', 8],
                        ['28, Сб', 16],
                        ['29, Вс', 2],
                    ]}
                    options={{
                        chartArea: { width: '90%' },
                        colors: ['#00a0ab'],
                        legend: { position: 'none' },
                        hAxis: {
                            minValue: 0,
                        },
                        vAxis: {
                        },
                    }}
                />
            </div>
        );
    }

    function visitsShow() {
        return (
            <div className="div"><Chart
                width={"100%"}
                height={"100%"}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['', 'Показов'],
                    ['23, Пн', 55],
                    ['24, ВТ', 95],
                    ['25, Ср', 222],
                    ['26, Чт', 333],
                    ['27, Пт', 48],
                    ['28, Сб', 16],
                    ['29, Вс', 52],
                ]}
                options={{
                    chartArea: { width: '90%' },
                    colors: ['#00a0ab'],
                    legend: { position: 'none' },
                    hAxis: {
                        minValue: 0,
                    },
                    vAxis: {
                    },
                }}
            /></div>
        );
    }
    return (

        <div className="statistic">
            <div className="statistic__header">
                <div className="statistic__header__block_left">
                    <h6 className="statistic__header__block_left_title">Статистика</h6>
                </div>
                <div className="statistic__header__block_right">
                    <span>{views ? views : 0} <Views /></span>
                    <span>3 +1 <Like /></span>
                </div>
            </div>
            <div className="statistic__buttons">
                <button onClick={() => setState(true)} className={state == true ? "statistic__active" : ''} >Показы</button>
                <button onClick={() => setState(false)} className={!state == true ? "statistic__active" : ''} >Переходы</button>
            </div>
            {state && viewsShow() || visitsShow()}
            <div className="statistic__footer">
                <div className="statistic__footer_date">
                    <button className="date__btn date_prev"></button>
                    <span>23 февраля - 1 марта</span>
                    <button className="date__btn date_next"></button>
                </div>
                <p>Переходы - это общее количество кликов по вашему обьъявлению другими пользователями. Этот показатель зависит от частоты показов.</p>
            </div>
        </div>
    )
}





import React from 'react';
import style from '../DetailedRow/detailed-row.module.css';

export const DetailedRow = ({date, rate}) => {
    return (
            <div className={style.detailedRow} key={date}>
                <div className={style.detailedRowDate}>Day: {date}</div>
                <div className={style.detailedRowRate}>Rate: {rate}</div>
            </div>
    );
};
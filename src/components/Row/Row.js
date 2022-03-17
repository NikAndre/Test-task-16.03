import React, { useRef, useState } from 'react';
import style from './Row.module.css';
import { DetailedRow } from "../DetailedRow/Detailed-Row";

export const Row = ({currency, onMouseOver, onMouseOut}) => {
    const {CharCode, Value, Previous, Name} = currency;
    const shift = Math.floor(Previous/Value);
    const [prevCur, setPrevCar] = useState();
    const detailWrapperRef = useRef();

    const onRowClick = async () => {
        const data = await fetchPrevCurrency(CharCode);

        const detailMap = [...data].map((elem) => {
            return <DetailedRow date={elem.date} rate={elem.rate} />
        });

        setPrevCar(detailMap);
    };

    return (
        <div key={CharCode} className={style['table-block']} onClick={onRowClick}>
            <div className={style['table-row']}>
                <div
                    className={style['table-cell']}
                    onMouseOver={(event) => {
                        onMouseOver(event, Name)
                    }}
                    onMouseOut={onMouseOut}
                >
                    {CharCode}
                </div>
                <div className={style['table-cell']}>{`${Value} руб.`}</div>
                <div className={style['table-cell']}>{`${shift}%`}</div>
            </div>
            <div ref={detailWrapperRef}>
                {prevCur}
            </div>
        </div>
    );
};

const fetchPrevCurrency = async (charCode) => {
    const currencyArr = [];
    const currentDate = new Date() ;
    for (let i = 0; i < 10 ; i++) {
        const day = currentDate.getUTCDate() - i;
        const month =
            currentDate.getUTCMonth() >= 10
                ? `${currentDate.getUTCMonth() + 1}`
                : `0${currentDate.getUTCMonth() + 1}`;

        await fetch(`https://www.cbr-xml-daily.ru/archive/2022/${month}/${day}/daily_json.js`)
            .then(response => response.json())
            .then(data => currencyArr.push({
                date: data.Date,
                rate: data.Valute[charCode].Value
            }))
            .catch(err => currencyArr.push({
                date: `${new Date(2022,currentDate.getUTCMonth(),currentDate.getUTCDate()-i+1).toISOString()}`,
                rate: '-'
            }));
    }
    return currencyArr;
};
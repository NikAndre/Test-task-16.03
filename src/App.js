import React, {useEffect, useState} from 'react';
import './App.css';
import { Row } from './components/Row/Row'
import {Tooltip} from "./components/Tooltip/Tooltip";

function App() {
    const [currency, setCurrency] = useState([]);
    const [tooltipProps, setTooltipProps] = useState(null);

    const fetchCurrency = async () => {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(response => response.json())
            .then((data) => {
                const jsx = []
                const arr = Object.values(data.Valute)
                arr.forEach((elem) => {
                    jsx.push(elem)
                })
                setCurrency(jsx)
            });
    };

    useEffect(() => {
        fetchCurrency();
    }, [])

    const onMouseOver = (event, currency) => {
        if (event.target.className === 'table-cell') {
            event.target.classList.add('cell-hover')
        };
        setTooltipProps({
            x: event.pageX,
            y: event.pageY + 12,
            currency
        });
    };
    const onMouseOut = (event, currency) => {
        setTooltipProps(null);
    };


    const array = [...currency].map((elem) => {
        return <Row
            currency={elem}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        />
    });

    return (
        <div className="App">
          <div className='row-block'>
                {array}
          </div>
            <Tooltip points={tooltipProps} />
        </div>
    );
}

export default App;



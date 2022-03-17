import React from 'react';

export const Tooltip = ({points}) => {
    if (!points) return null;

    const {x, y, currency} = points;
    const style = {
        left: x,
        top: y,
        width: 120,
        zIndex: 1,
        position: 'absolute',
        border: '1px solid black',
        padding: 10,
        backgroundColor: 'rgb(242,228,228)'
    };

    return (
        <p style={style}>
            {currency}
        </p>
    );
};
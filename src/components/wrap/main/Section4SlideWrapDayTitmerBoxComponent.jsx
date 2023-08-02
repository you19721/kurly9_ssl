import React from 'react';

export default function Section4SlideWrapDayTitmerBoxComponent({houres,minutes,seconds}) {
    return (
        <div className='day-titmer-box'>
            <img src="./images/intro/day_titmer.svg" alt="" />
            <span className='houres'>{houres < 10 ? `0${houres}` : houres}</span>
            <i>:</i>
            <span className='minutes'>{minutes < 10 ? `0${minutes}` : minutes}</span>
            <i>:</i>
            <span className='seconds'>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
    );
};
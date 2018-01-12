import React from 'react';

import classes from './PolygonGraphControll.css'

const PolygonGraphControll = (props) => {

    return (
        <div>
            <div className={classes.controllWrapper}>
                <label>Pick Color for Graph Background</label>
                <input onChange={props.changeGraphBackground} type='color' />
            </div>
            <div className={classes.controllWrapper}>
                <label>Pick Color for Graph Border</label>
                <input onChange={props.changeGraphBorder} type='color' />
            </div>
        </div>
    );
}

export default PolygonGraphControll;
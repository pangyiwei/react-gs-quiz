import React from 'react'
import { Typography, Box } from '@material-ui/core';

const Timer = ({ timeLeft }) => {

    let timerComponents = [];
    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }
        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });


    return (
        <Box mx="8px">
            <Typography variant="body1">
                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </Typography>
        </Box>
    )
}



export default Timer

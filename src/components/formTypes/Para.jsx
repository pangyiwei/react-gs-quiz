import React from 'react'
import { Typography } from '@material-ui/core'

const Para = (props) => {
    return (
        <>
            <Typography variant="body1">
                {props.question.text}
            </Typography>
        </>
    )
}

export default Para

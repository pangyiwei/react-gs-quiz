import React from 'react'
import { Typography } from '@material-ui/core'

const Heading = (props) => {
    return (
        <>
            <Typography variant="h3">
                {props.question.text}
            </Typography>
        </>
    )
}

export default Heading

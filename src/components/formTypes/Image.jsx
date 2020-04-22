import React from 'react'
import { Typography, Box } from '@material-ui/core'

const Image = (props) => {
    return (
        <>
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <a href={props.question.text} target="_blank">
                    <img style="height:100%;border:0" src={props.question.text} />
                </a>
                <Typography variant="subtitle1">
                    {props.question.label}
                </Typography>
            </Box>

        </>
    )
}

export default Image

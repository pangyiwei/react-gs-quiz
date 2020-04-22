import React from 'react'
import { TextField, Typography } from '@material-ui/core'

const ShortAns = props => {
    const onChange = (e) => {
        props.setAnswer({
            qnId: props.qnId,
            value: e.target.value
        })
    }
    return (
        <>
            <Typography variant="body1">
                {props.qnId+1 + ". " + props.question.text}
            </Typography>
            <TextField
                id={props.qnId}
                fullWidth
                label={props.question.label || null}
                value={props.answer}
                onChange={onChange}
            />
        </>
    )
}

export default ShortAns

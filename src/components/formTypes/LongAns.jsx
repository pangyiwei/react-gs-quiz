import React from 'react'
import { Typography, TextField } from '@material-ui/core'

const LongAns = (props) => {
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
                multiline
                id={props.qnId}
                rows={3}
                fullWidth
                label={props.question.label || null}
                value={props.answer}
                onChange={onChange}
            />
        </>
    )
}

export default LongAns

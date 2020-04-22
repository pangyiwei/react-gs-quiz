import React from 'react'
import { Typography, FormControlLabel, RadioGroup, Radio, Box } from '@material-ui/core'

const MultipleChoice = (props) => {
    
    const onChange = (e) => {
        props.setAnswer({
            qnId: props.qnId,
            value: e.target.value
        });
    }
    const parsedOptions = JSON.parse(props.question.options);
    const options = parsedOptions.map(optionText => {
        return (
            <Box display="flex" flexDirection="row" alignItems="center">
                <Radio 
                    color="primary"
                    onChange={onChange}
                    value={optionText}
                    checked={props.answer===optionText}
                />
                <Typography variant="body1">
                    {optionText}
                </Typography>
            </Box>
        )
    })
    return (
        <>
            <Typography variant="body1">
                {props.qnId + 1 + ". " + props.question.text}
            </Typography>
            <RadioGroup value={props.answer} id={props.qnId} onChange={onChange}>
                {options}
            </RadioGroup>
        </>
    )
}

export default MultipleChoice

import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    container: {
        backgroundColor: "#f5f5f7"
    }
})

const FormItemContainer = (props) => {
    const classes = useStyles();
    return (
        <Box className={props.isQuestion?classes.container:null} boxShadow={props.isQuestion?3:0} my={props.isQuestion?"16px":"0px"} p="24px" borderRadius="10px" display="flex" flexDirection="column" alignItems="flex-start">
            {props.children}
        </Box>
    )
}

export default FormItemContainer

import React from 'react'
import { Box, Typography, TextField, Button, Avatar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    error: {
        color: "red"
    },
    loginBox: {
        backgroundColor: "#f5f5f7"
    }
})

const Login = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.loginBox} boxShadow={3} my="32px" p="32px" borderRadius="25px" display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3">Login</Typography>
            <Box my="16px">
                <Avatar></Avatar>
            </Box>
            <Box my="16px" width="100%">
                <Typography variant="body1">Enter the code given to you below:</Typography>
                <TextField fullWidth label="Code" value={props.code} onChange={e=>props.setCode(e.target.value)}/>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" className={classes.error}>
                <Typography variant="body1">
                    {props.error}
                </Typography>
            </Box>
            <Button my="16px" variant="contained" color="primary" fullWidth onClick={props.handleLogin}>Start</Button>
        </Box>
    )
}

export default Login

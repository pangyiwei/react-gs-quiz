import React from 'react';
import { Box, AppBar, Toolbar, Typography, ThemeProvider, IconButton, Icon, Container, Avatar, CircularProgress, makeStyles, Fab } from '@material-ui/core';
import './main.css';
import theme from './theme';
import Form from './pages/Form';
import Login from './pages/Login';
import serverMethods from './services/server';
import SubmitConfirmationDialog from "./components/SubmitConfirmationDialog";
import InfoDialog from './components/InfoDialog';
import Timer from './components/Timer';

const App = () => {
    const classes = useStyles();
    const [title, setTitle] = React.useState("");
    const [submitText, setSubmitText] = React.useState("");
    const [loginError, setLoginError] = React.useState("");
    const [login, setLogin] = React.useState(false);
    const [code, setCode] = React.useState("");
    const [name, setName] = React.useState("test");
    const [questions, setQuestions] = React.useState([]);
    const [endTime, setEndTime] = React.useState(0);
    const [answers, setAnswers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [openSubmitConfirmation, setOpenSubmitConfirmation] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState("");
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft(endTime));

    React.useEffect(() => {
        const init = async () => {
            setLoading(true);
            const result = await serverMethods.getMeta();
            setTitle(result.title);
            setSubmitText(result.submitText);
            setLoading(false);
        }
        init();
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(endTime));
        }, 1000);
    });

    React.useEffect(() => {
        if (new Date().getTime() > endTime && endTime > 0) {
            setInfoDialogMessage("Time is Up");
            setCode('');
            setLogin(false);
            setAnswers([]);
            setQuestions([]);
            setEndTime(0);
        }
    }, [timeLeft])

    const handleLogin = async () => {
        setLoading(true);
        const result = await serverMethods.login(code);
        setLoading(false);
        // console.log(result);
        if (result != "unauthorized") {
            setName(result.name);
            setLoginError("");
            setLogin(true);
        } else {
            setLoginError("Invalid Code");
        }
    }

    const handleSave = async () => {
        setLoading(true);
        const result = await serverMethods.save(code, answers);
        setLoading(false);
        if (result === "OK") {
            setInfoDialogMessage("Saved. You still have to submit your work within the time limit");
        } else {
            setInfoDialogMessage("Error Saving. Please refresh and try again");
        }
    }

    const handleSubmit = async () => {
        setOpenSubmitConfirmation(true);
    }

    const handleConfirmSubmit = async () => {
        setOpenSubmitConfirmation(false);
        setLoading(true);
        const result = await serverMethods.submit(code, answers);
        setLoading(false);
        if (result == "OK") {
            setInfoDialogMessage(submitText)
        } else {
            setInfoDialogMessage("Error Submitting.");
        }
        setCode('');
        setLogin(false);
        setAnswers([]);
        setQuestions([]);
    }

    const content = login ?
        (
            <Form
                code={code}
                questions={questions}
                setEndTime={setEndTime}
                title={title}
                answers={answers}
                setQuestions={setQuestions}
                setAnswers={setAnswers}
                handleSubmit={handleSubmit}
            />
        ) :
        (
            <Login
                error={loginError}
                setCode={setCode}
                code={code}
                handleLogin={handleLogin}
            />
        )
    return (
        <ThemeProvider theme={theme}>
            <Box height="100vh" width="100%" position="relative">
                <Box overflow="auto" height="100vh" width="100%">
                    <AppBar position="sticky">
                        <Toolbar>
                            <Box mx={"16px"} flexGrow={1}>
                                <Typography variant="body1">{title}</Typography>
                            </Box>
                            {
                                login &&
                                <Box mx={"16px"} display="flex" flexDirection="row" alignItems="center">
                                    {endTime > 0 &&
                                        <Box display="flex" flexDirection="row">
                                            <Typography variant="body1">Time Left: </Typography>
                                            <Timer timeLeft={timeLeft} />
                                        </Box>
                                    }
                                    <Box mx="8px">
                                        <Typography variant="body1">{name}</Typography>
                                    </Box>
                                    <Avatar>{name[0]}</Avatar>
                                </Box>
                            }
                        </Toolbar>
                    </AppBar>
                    <Container maxWidth={login ? 'md' : "sm"}>
                        {content}
                    </Container>
                </Box>
                <SubmitConfirmationDialog
                    open={openSubmitConfirmation}
                    onClose={() => { setOpenSubmitConfirmation(false) }}
                    onNo={() => { setOpenSubmitConfirmation(false) }}
                    onYes={handleConfirmSubmit}
                />
                <InfoDialog
                    open={infoDialogMessage.length > 0}
                    onClose={() => { setInfoDialogMessage("") }}
                    message={infoDialogMessage}
                />

                {loading &&
                    <Box className={classes.loaderContainer} position="absolute" width="100%" height="100%" left="0px" top="0px" display="flex" justifyContent='center' alignItems="center">
                        <CircularProgress size={64} />
                    </Box>
                }
                {login &&
                    <Box position="absolute" right="36px" bottom="36px" display="flex" flexDirection="column">
                        <Box my="4px">
                            <Fab color="primary" onClick={handleSave}>
                                <Icon>save</Icon>
                            </Fab>
                        </Box>
                        <Box my="4px">
                            <Fab color="secondary" onClick={handleSubmit}>
                                <Icon>send</Icon>
                            </Fab>
                        </Box>
                    </Box>
                }
            </Box>
        </ThemeProvider>
    )
}

const useStyles = makeStyles({
    loaderContainer: {
        backgroundColor: "rgba(0,0,0,0.4)"
    }
});

const calculateTimeLeft = (endTime) => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
            mins: Math.floor((difference / 1000 / 60) % 60),
            secs: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

export default App;
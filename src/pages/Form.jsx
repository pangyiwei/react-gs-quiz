import { Box, Typography } from '@material-ui/core';
import React from 'react';
import FormItem from '../components/FormItem';
import serverMethods from '../services/server';

const Form = props => {

    const handleChangeAnswer = (e) => {
        // console.log(e);
        let newAnswers = [...props.answers];
        newAnswers[e.qnId] = e.value;
        props.setAnswers(newAnswers);
    }

    React.useEffect(() => {
        const init = async () => {
            const {questions, end, answers} = await serverMethods.getQuestions(props.code);
            props.setQuestions(questions);
            props.setEndTime(end);
            // console.log(questions);
            if (answers) {
                props.setAnswers(JSON.parse(answers));
            } else {
                const answers = questions.map(q => "");
                props.setAnswers(answers);
            }
        }
        init();
    }, []);
    

    let qnCount = 0;
    const form = props.questions.map((question, idx) => {
        const item = <FormItem
            key={idx}
            qnId={qnCount}
            question={question}
            answer={props.answers[qnCount]}
            setAnswer={handleChangeAnswer}
        />
        if (question.type !== "heading" && question.type !== "paragraph") {
            qnCount++;
        }
        return item;
    });


    return (
        <>
            <Box my="16px" display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h2">
                    {props.title}
                </Typography>
            </Box>
            {form}
            {/* <Button fullWidth onClick={props.handleSubmit} color="primary" variant="contained">Submit</Button> */}
            <Box height="240px"></Box>
        </>
    )
}

export default Form

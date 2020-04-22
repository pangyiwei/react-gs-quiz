import React from 'react'
import ShortAns from './formTypes/ShortAns';
import MultipleChoice from './formTypes/MultipleChoice';
import LongAns from './formTypes/LongAns';
import Heading from './formTypes/Heading';
import Para from './formTypes/Para';
import FormItemContainer from './FormItemContainer';
import Image from './formTypes/Image';

const FormItem = (props) => {
    let item = null;
    switch(props.question.type) {
        case "shortAns":
            item = (<ShortAns {...props}/>);
            break;
        case "longAns":
            item = (<LongAns {...props}/>);
            break;
        case "multipleChoice":
            item = (<MultipleChoice {...props} />);
            break;
        case "heading":
            item = (<Heading {...props}/>);
            break;
        case "image":
            item = (<Image {...props}/>);
            break;
        default:
            item = (<Para {...props} />);
    }
    return (
        <FormItemContainer isQuestion={props.question.type!=="heading" && props.question.type!=="paragraph" && props.question.type!=="image"}>
            {item}
        </FormItemContainer>
    )
}

export default FormItem

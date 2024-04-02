import React , {useState} from 'react';
import { Form, Button } from 'react-bootstrap'; 

const MyButton = ({
                    buttonText,
                    handleOnClick,
                    disabled
                }) => {

    return (
            <Button
                className='btn w-100 mb-2 btn-lg btn-dark disk-button'
                style={{
                    fontSize: "20px",
                    width: "100%",
                    height: "50px"
                }}
                disabled={disabled}
            > 
                {buttonText} 
            </Button>
    );
};

export default MyButton;
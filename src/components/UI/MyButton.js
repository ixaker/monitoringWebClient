import React , {useState} from 'react';
import { Form, Button } from 'react-bootstrap'; 
import Loader from '../Loader/Loader';

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
                onClick={handleOnClick}
            >   <span className='d-flex justify-content-center align-items-center'>
                    {buttonText}
                    <span className='mx-2'></span>
                    {disabled ? <Loader color="text-secondary"/> : ''}
                </span>
                
            </Button>
    );
};

export default MyButton;
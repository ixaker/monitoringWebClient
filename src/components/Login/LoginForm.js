import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import { sendAuthData } from './sendAuthData';
import { useDispatch } from 'react-redux';
import { setToken } from '../../rtk/TokenSlice';

const LoginForm = ({ setShow }) => {

    const [value, setValue] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [correct, setCorrect] = useState('')
    const dispatch = useDispatch();

    const handleClick = (event) => {
        event.preventDefault();
        setValue('')
        setCorrect(true);
        setError(null);
        const data = {
            "password": value
        }
        setButtonDisabled(true)
        sendAuthData(data, setShow, setButtonDisabled)
            .then((data) => {
                setShow(false);
                dispatch(setToken(data));
                console.log('Login form update token', data)
            })
            .catch(error => {
                console.error("Помилка авторизації:", error.message);
                setCorrect(false)
                setError('авторизація не відбулась')
            })
            .finally(() => {
                setButtonDisabled(false);
            });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClick(event);
        }
    };

    return (
        <>
            <Form.Group>
                <MyInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    isPasswordValid={correct}
                    autoFocus={true}
                    placeholderText={' '}
                    errorMessage={error}
                    onKeyDown={handleKeyPress}
                />

                <MyButton
                    buttonText="Вхід"
                    handleOnClick={handleClick}
                    disabled={buttonDisabled}
                />
            </Form.Group>
        </>
    );
};

export default LoginForm;
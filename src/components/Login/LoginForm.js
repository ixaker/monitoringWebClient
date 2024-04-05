import React , {useState} from 'react';
import { Form } from 'react-bootstrap'; 
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import { sendAuthData } from './sendAuthData';

const LoginForm = ({}) => {
    
    const [value, setValue] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleClick = () => {
        // sendAuthData(value);
        setButtonDisabled(true)
        localStorage.setItem('token', "asdf");

    };

    return (
        <>
            <Form.Group>
                <MyInput 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    isPasswordValid={''}
                    autoFocus={true}
                    placeholderText={' '}
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
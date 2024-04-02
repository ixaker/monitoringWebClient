import React , {useState} from 'react';
import { Form } from 'react-bootstrap'; 
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';

const ActivationOn = () => {
    const [password, setPassword] = useState('text');

    return (
        <Form.Group>
            <MyInput 
                value={password}
                isPasswordValid={true}
                showPassword={true}
            />       
            <MyInput 
                value={password}
                isPasswordValid={true}
                showPassword={true}
            />       
            <MyButton 
                buttonText="Активувати шифрування"
            /> 
        </Form.Group>
    );
};

export default ActivationOn;
import React , {useState} from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyInput = ({type, value, onChange, isPasswordValid }) => {

    const [showPassword, setShowPassword] = useState(false);
    // function for visibly password handle
    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const togglePasswordVisibility = () => {
        console.log('asd')
    }

    return (
        <InputGroup className="mb-2">
            <Form.Control
                className={`form-control-lg disk-input ${isPasswordValid ? 'is-valid' : (isPasswordValid === false ? 'is-invalid' : '')}`}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder="введіть пароль (не менше 8 символів)"
                autoComplete="off"
            />
            {/* elements for password visibly */}
            {/* <InputGroup.Append>
                <InputGroup.Text >
                    <FontAwesomeIcon icon={faEye} />
                </InputGroup.Text>
            </InputGroup.Append> */}
        </InputGroup>

    );
};

export default MyInput;
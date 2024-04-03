import React , {useState} from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyInput = ({type, value, onChange, isPasswordValid, placeholderText, errorMessage }) => {

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
                placeholder={placeholderText || "введіть пароль (не менше 8 символів)"}
                autoComplete="off"
                isValid={isPasswordValid === true}
                isInvalid={isPasswordValid === false}
                // "введіть пароль (не менше 8 символів)"
            />
            {/* elements for password visibly */}
            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="fa-lg" />
            </span>
            {/* Feedback for error message */}
            {errorMessage && (
                <Form.Control.Feedback type="invalid">
                    {errorMessage}
                </Form.Control.Feedback>
            )}
        </InputGroup>

    );
};

export default MyInput;
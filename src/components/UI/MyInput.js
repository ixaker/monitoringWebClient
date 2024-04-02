import React , {useState} from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyInput = ({type, value, onChange, isPasswordValid, password, setPassword }) => {

    const [showPassword, setShowPassword] = useState(false);
    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const togglePasswordVisibility = () => {
        console.log('asd')
    }

    return (
        <InputGroup className="mb-2">
            <Form.Control
                className={`form-control-lg disk-input ${isPasswordValid ? 'is-valid' : password.length > 0 ? 'is-invalid' : ''}`}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="введіть пароль (не менше 8 символів)"
                autoComplete="off"
            />
            {/* <InputGroup.Append>
                <InputGroup.Text >
                    <FontAwesomeIcon icon={faEye} />
                </InputGroup.Text>
            </InputGroup.Append> */}
        </InputGroup>

    );
};

export default MyInput;
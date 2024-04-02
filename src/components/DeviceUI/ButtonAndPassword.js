import React , {useState} from 'react';
import { Form, Button } from 'react-bootstrap'; // Припускаю, що ви використовуєте Bootstrap
import { sendDataToServer } from '../SocketConection';


const ButtonAndPassword = ({ name, input, password, setPassword, inputText, handleOnClick }) => {
    
    const isPasswordValid = input ? password.length >= 8 : true;
    console.log(input)
    console.log(isPasswordValid)

    return (
        
        <div className=''>
            <Form.Group className='mb-2'>
                {input 
                        ? <Form.Control
                            className={`mb-2 form-control-lg disk-input ${isPasswordValid ? 'is-valid' : password.length > 0 ? 'is-invalid' : ''}`}
                            variant="outline-primary"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="введіть пароль (не менше 8 символів)"
                            autoComplete="off"
                        />
                        : ""
                    }
                <Button 
                        className='btn w-100 mb-2 btn-lg btn-dark disk-button' 
                        onClick={() => handleOnClick(inputText)}
                        disabled={!isPasswordValid}
                >
                    {name}
                </Button>
                
            </Form.Group>
           
        </div>
        
    );
};

export default ButtonAndPassword;
import React , {useState} from 'react';
import { Form, Button } from 'react-bootstrap'; 
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';

const UnlockDisk = () => {

    return (
        
        <div className=''>
            <Form.Group className='mb-2'>
                <MyInput 
                    password="asdfasdf"
                />
                <MyButton 
                    buttonText="Розблокувати диск"
                />
            </Form.Group>
        </div>
    );
};

export default UnlockDisk;
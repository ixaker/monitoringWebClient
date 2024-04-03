import React , {useState} from 'react';
import { Form, Button } from 'react-bootstrap'; 
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import ConfirmationModal from '../confirmationModal/confirmationModal';

const UnlockDisk = ({ deviceId }) => {

    const [value, setValue] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false);
    const isPasswordValid = value.length >= 8 ? true : (value.length > 0 ? false : '');
    // const inputText={`Unlock-BitLocker -MountPoint "${diskName}" -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force)`}

    const handleConfirm = (text) => {
        console.log('handleConfirm in diskMenu')
        console.log(inpText)
        sendDataToServer({ inputText, deviceId });
        setShowConfirmation(false);
        onHidePrevious()
    };

    const handleOnClick = (inputText) => {
        setShowConfirmation(true)
        // setInpText(inputText);
    }

    return (
        
        <div className=''>
            <Form.Group className='mb-2'>
                <MyInput 
                    password="asdfasdf"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    isPasswordValid={isPasswordValid}
                />
                <MyButton 
                    buttonText="Розблокувати диск"
                    disabled={!isPasswordValid}
                    handleOnClick={() => handleOnClick(inputText)}
                    />
            </Form.Group>
            <ConfirmationModal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={() => handleConfirm()}
            />
        </div>
    );
};

export default UnlockDisk;
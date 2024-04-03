import React , {useState} from 'react';
import { Form } from 'react-bootstrap'; 
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import ConfirmationModal from '../confirmationModal/confirmationModal';
import { sendDataToServer } from '../SocketConection';

const ActivationOn = ({ deviceId, diskName, onHidePrevious }) => {
    
    const [password, setPassword] = useState('text');
    const [value, setValue] = useState('')
    const [secondValue, setSecondValue] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false);

    const isPasswordValid = value.length >= 8 ? true : (value.length > 0 ? false : '');
    const isPasswordMatch = secondValue === '' ? '' : (secondValue === value);
    const passwordsMatchMessage = !isPasswordMatch ? "Паролі не співпадають" : "";
    //text of command for device
    const inputText=`Enable-BitLocker -MountPoint "${diskName}" -PasswordProtector -Password (ConvertTo-SecureString -String "${value}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`
    

    const handleConfirm = () => {
        sendDataToServer({ inputText, deviceId });
        setShowConfirmation(false);
        onHidePrevious() //close parent modal
    };

    const handleOnClick = (inputText) => {
        setShowConfirmation(true)
    }

    return (
        <>
            <Form.Group>
                <MyInput 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    isPasswordValid={isPasswordValid}
                />       
                <MyInput 
                    value={secondValue}
                    isPasswordValid={isPasswordMatch}
                    onChange={(e) => setSecondValue(e.target.value)}
                    placeholderText={"повторіть пароль"}
                    errorMessage={passwordsMatchMessage}
                />
                <MyButton 
                    buttonText="Активувати шифрування"
                    disabled={!isPasswordValid || !isPasswordMatch}
                    handleOnClick={handleOnClick}
                /> 
            </Form.Group>
            <ConfirmationModal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={() => handleConfirm()}
            />
        </>
    );
};

export default ActivationOn;
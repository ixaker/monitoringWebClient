import React , {useState} from 'react';
import { Form, Button } from 'react-bootstrap'; 
import MyButton from '../UI/MyButton';
import ConfirmationModal from '../confirmationModal/confirmationModal';
import { sendDataToServer } from '../SocketConection';

const ActivationOff = ({deviceId, diskName, onHidePrevious}) => {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const inputText=`Disable-BitLocker -MountPoint "${diskName}"`

    const handleConfirm = () => {
        sendDataToServer({ inputText, deviceId });
        setShowConfirmation(false);
        onHidePrevious() //close parent modal
    };

    const handleOnClick = (inputText) => {
        setShowConfirmation(true)
    }

    const disabled = false
    return (
        <>
            <MyButton 
                buttonText="Вимкнути шифрування"
                disabled={disabled}
                handleOnClick={handleOnClick}
            />
            <ConfirmationModal
                    show={showConfirmation}
                    onHide={() => setShowConfirmation(false)}
                    onConfirm={() => handleConfirm()}
            />
        </>
    );
};

export default ActivationOff;
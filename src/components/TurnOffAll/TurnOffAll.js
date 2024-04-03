import React , {useState} from 'react';
import { sendDataToServer } from '../SocketConection';
import { Button } from 'react-bootstrap';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import ConfirmationModal from '../confirmationModal/confirmationModal';


const TurnOffAll = () => {
    
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleTurnOffAll = () => {
        setShowConfirmation(true);
    };

    
    
    const handleConfirm = () => {
        setShowConfirmation(false);
        console.log('вимкнути всі компьютери');
    }

    
    return (
        <>
            <Button 
                variant="danger" 
                size="lg"
                onClick={handleTurnOffAll}
                className='mb-4 d-flex flex-column align-items-center'
                onClick={handleTurnOffAll}
            >
                <span className='mb-2'>
                    Вимкнути всі пристрої
                </span>
                
                <FontAwesomeIcon 
                    icon={faPowerOff} 
                    className='mb-2' 
                    style={{
                        "fontSize": "80px"
                    }}
                />
            </Button>
            <ConfirmationModal 
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default TurnOffAll;
import React , {useState} from 'react';
import { sendDataToServer } from '../SocketConection';
import { Button } from 'react-bootstrap';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import ConfirmationModal from '../confirmationModal/confirmationModal';

const LogOut = () => {
    
    const [showConfirmation, setShowConfirmation] = useState(false);

    const deleteAuthToken = () => {
        localStorage.removeItem('token')
    }
    const handleLogOut = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        console.log('handleConfirm logOut');
        deleteAuthToken();
    }

    
    return (
        <>
            <Button 
                variant="dark" 
                size="lg"
                onClick={handleLogOut}
                className='mb-4 d-flex flex-row align-items-center justify-content-center'
            >
                <span className='my-3 me-3'>
                    Вийти
                </span>
                
                <FontAwesomeIcon 
                    icon={faArrowRightFromBracket} 
                    className='mb-2' 
                    style={{
                        "fontSize": "20px"
                    }}
                />
            </Button>
            <ConfirmationModal 
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={handleConfirm}
                title="Вийти з додатку?"
                message="Ви намагаєтесь вийти з додатку. Наступний вхід можливий тільки за паролем."
            />
        </>
    );
};

export default LogOut;
import React, { useState } from 'react';
import { sendDataToServer } from '../SocketConection';
import { Button } from 'react-bootstrap';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmationModal from '../confirmationModal/confirmationModal';
import Loader from '../Loader/Loader';

const LogOut = ({ setShow }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false)

    const handleLogOut = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        setShow(true)
        setShowConfirmation(false);
        console.log('handleConfirm logOut');
        setButtonDisable(true)
        deleteAuthToken();
    }

    return (
        <>
            <Button
                variant="dark"
                size="lg"
                onClick={handleLogOut}
                className='mb-4 d-flex flex-row align-items-center justify-content-center'
                disabled={buttonDisable}
            >
                <span className='my-3 me-3'>
                    Вийти
                </span>

                <span className='p-0 d-flex flex-row align-items-center justify-content-center'>
                    {buttonDisable
                        ? <Loader color="text-secondary" />
                        : <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className=''
                            style={{
                                "fontSize": "20px"
                            }}
                        />

                    }

                </span>

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

export const deleteAuthToken = () => {
    console.log('deleteAuthToken')
    localStorage.removeItem('token')
}
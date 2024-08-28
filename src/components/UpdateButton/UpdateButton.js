import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader/Loader';
import ConfirmationModal from '../confirmationModal/confirmationModal';
import { sendUpdateEvent } from '../SocketConection';

const UpdateButton = () => {
    const [buttonDisable, setButtonDisable] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        setShowConfirmation(false);
        console.log('update');
        setButtonDisable(true);
        try {
            await sendUpdateEvent();
            setButtonDisable(false);
        } catch (error) {
            console.error('Error sending data to server:', error);
            setButtonDisable(false);
        }
    };

    return (
        <>
            <Button
                variant="primary"
                size="lg"
                onClick={handleClick}
                className='mb-4 d-flex flex-row align-items-center justify-content-center'
                disabled={buttonDisable}
            >
                <span className='my-3 me-3'>
                    Оновити ПЗ всіх приладів
                </span>

                <span className='p-0 d-flex flex-row align-items-center justify-content-center'>
                    {buttonDisable
                        ? <Loader color="text-secondary" />
                        : <FontAwesomeIcon
                            icon={faRotate}
                            style={{ fontSize: "20px" }}
                        />
                    }
                </span>
            </Button>
            <ConfirmationModal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={handleConfirm}
                title="Оновлення!"
                message="Оновити застосунки на всіх пристроях?"
            />
        </>
    );
};

export default UpdateButton;

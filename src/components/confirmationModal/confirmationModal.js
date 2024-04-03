import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmationModal({ show, onHide, onConfirm }) {
    return (
        <Modal 
            show={show} 
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal-fullscreen-sm-down' 
        >
            <Modal.Header closeButton>
                <Modal.Title>Підтвердження операції</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Скасувати
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Підтвердити
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal
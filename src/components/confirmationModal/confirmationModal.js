import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './confirmationmodal.css'

function ConfirmationModal({ show, onHide, onConfirm, title, message }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal-fullscreen-sm-down modal-container'
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className='d-flex justify-content-end'
                >
                    {title || 'Підтвердження операції'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message || ''}
            </Modal.Body>
            <Modal.Footer
                className='d-flex justify-content-center'
            >
                <Button variant="secondary" className='btn-lg' onClick={onHide}>
                    Скасувати
                </Button>
                <Button variant="danger" className='btn-lg' onClick={onConfirm} >
                    Підтвердити
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal
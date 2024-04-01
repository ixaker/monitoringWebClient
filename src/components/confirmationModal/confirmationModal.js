import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmationModal({ show, onHide, onConfirm }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Підтвердження операції</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Ви впевнені, що хочете виконати цю операцію?
            </Modal.Body>
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
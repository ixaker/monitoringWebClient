import React, { useState } from 'react';
import './devicemenu.css'
import { sendDataToServer, deleteDeviceFromServer } from './../../components/SocketConection';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faPowerOff, faRotateLeft, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmationModal from '../confirmationModal/confirmationModal';
import { useDispatch } from 'react-redux';
import { removeDevice } from '../../rtk/DevicesSlice';


const DeviceMenu = ({ deviceId, show, onHide, device, rename }) => {
    const dispatch = useDispatch();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [inputText, setInputText] = useState('')

    const handleOnClick = (command) => {
        if (command === 'edit_name') {
            console.log('rename');
            onHide();
            setTimeout(() => {
                rename();
            }, 300)


            return;
        }
        setShowConfirmation(true)
        setInputText(command)
    }

    const handleConfirm = () => {
        console.log('sendDataToServer from deviceMenu');
        console.log('sendDataToServer from deviceMenu', deviceId);
        setShowConfirmation(false);
        onHide();
        console.log('sendDataToServer', inputText)
        if (inputText === 'delete_device') {
            deleteDeviceFromServer(deviceId);
            dispatch(removeDevice(deviceId));
        } else if (inputText === 'edit_name') {
            console.log('deviceMenu rename click');
            rename()
        } else {
            sendDataToServer({ inputText, deviceId });
        }

    }

    const MenuButton = ({ name, command, svg }) => {
        return (
            <div className='menu-button'
                onClick={() => { handleOnClick(command) }}
            >
                <Button variant="" className='button-off btn-dark'>
                    <div className='btn-text'>
                        {name}
                    </div>
                    <div className='btn-svg'>
                        {svg}
                    </div>
                </Button>{' '}
            </div>
        )
    }
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Компьютер {device.name}. {device.nickname}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="d-flex justify-content-evenly align-items-center flex-row"
                >
                    {device.online ? (
                        <>
                            <MenuButton
                                name={'вимкнути'}
                                svg={<FontAwesomeIcon icon={faPowerOff} />}
                                command={'shutdown /s /t 0'}
                            />

                            <MenuButton
                                name={'перезавантажити'}
                                command={'shutdown /r /t 0'}
                                svg={<FontAwesomeIcon icon={faRotateLeft} />}
                            />
                            <MenuButton
                                name={'перейменувати'}
                                command={'edit_name'}
                                svg={<FontAwesomeIcon icon={faPenToSquare} />}
                            />
                        </>
                    ) : (
                        <MenuButton
                            name={'видалити'}
                            command={'delete_device'}
                            svg={<FontAwesomeIcon icon={faTrash} />}
                        />
                    )}
                </Modal.Body>
            </Modal>
            <ConfirmationModal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={handleConfirm}
                message={"Ви підтверджуєте дію?"}
            />
        </>
    );
};

export default DeviceMenu;
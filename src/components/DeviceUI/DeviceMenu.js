import React, {useState} from 'react';
import './devicemenu.css'
import { sendDataToServer } from './../../components/SocketConection';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faPowerOff, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import ConfirmationModal from '../confirmationModal/confirmationModal';


const DeviceMenu = ({ deviceId, show, onHide, device }) => {
    
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [inputText, setInputText] = useState('')

    const handleOnClick = (command) => {
        setShowConfirmation(true)
        setInputText(command)
    }

    const handleConfirm = () => {
        console.log('sendDataToServer from deviceMenu');
        setShowConfirmation(false);
        onHide();
        console.log('sendDataToServer', inputText)
        sendDataToServer({inputText, deviceId});
    }



const MenuButton = ({name, command, svg}) => {
    return (
        <div className='menu-button'
            onClick={() => {handleOnClick(command)}}
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
                Компьютер {device.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                className="d-flex justify-content-evenly align-items-center flex-row"
            >
                
                    <MenuButton 
                        name={'вимкнути'} 
                        svg={<FontAwesomeIcon icon={faPowerOff} className='.btn-svg' />}
                        command={'shutdown /s /t 0'}
                    />
                
                    <MenuButton 
                        name={'перезавантажити'} 
                        command={'shutdown /r /t 0'}
                        svg={<FontAwesomeIcon icon={faRotateLeft} className='.btn-svg' />}
                    />  
                
                

            </Modal.Body>
        </Modal>
        <ConfirmationModal 
            show={showConfirmation}
            onHide={() => setShowConfirmation(false)}
            onConfirm={handleConfirm}
        />
        </>  
    );
};

export default DeviceMenu;
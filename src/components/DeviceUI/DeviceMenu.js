import React from 'react';
import './devicemenu.css'
import { sendDataToServer } from './../../components/SocketConection';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeviceMenu = ({ deviceId, show, onHide, device }) => {
    
    console.log('deviceId', deviceId);
    const handleOnClick = (inputText, deviceId) => {
        console.log('sendDataToServer from deviceMenu');
        console.log(inputText);
        console.log(deviceId);
        sendDataToServer({inputText, deviceId})
    }

//     const commands = [
//     `Unlock-BitLocker -MountPoint "${disk}:" -Password (ConvertTo-SecureString -String "${pass}" -AsPlainText -Force)`, //розблокувати
//     `Enable-BitLocker -MountPoint "${disk}:" -PasswordProtector -Password (ConvertTo-SecureString -String "${pass}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`, // розшифрувати
//     `Disable-BitLocker -MountPoint "${disk}:"` // зашифрувати
// ]

const MenuButton = ({name, command}) => {
    return (
        <div className='menu-button'
            onClick={() => handleOnClick(command, deviceId)}
        >
            <Button variant="outline-primary" className='w-100'>{name}</Button>{' '}
        </div>
    )
}
    return (
        <Modal  
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Компьютер {device.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <MenuButton 
                        name={'вимкнути'} 
                        command={'shutdown /s /t 0'}
                    />
                    <MenuButton 
                        name={'перезавантажити'} 
                        command={'shutdown /r /t 0'}
                    />                    
            </Modal.Body>
        </Modal>
        
    );
};

export default DeviceMenu;
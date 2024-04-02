import React , {useState} from 'react';
import { useSelector } from 'react-redux';
import './devicemenu.css'
import { sendDataToServer } from './../../components/SocketConection';
import Modal from 'react-bootstrap/Modal';
import ButtonAndPassword from './ButtonAndPassword'
import ConfirmationModal from '../confirmationModal/confirmationModal';

import UnlockDisk from '../DiskActions/UnlockDisk';
import ActivationOff from '../DiskActions/ActivationOff';
import ActivationOn from '../DiskActions/ActivationOn';

const DiskMenu = ({ diskName, deviceId, show, onHide, device, setModalShow, onHidePrevious}) => {
    
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [password, setPassword] = useState('');
    const [inpText, setInpText] = useState('')
    
    const handleConfirm = (text) => {
        console.log('handleConfirm in diskMenu')
        console.log(inpText)
        sendDataToServer({ inputText: inpText, deviceId });
        setShowConfirmation(false);
        onHidePrevious()
    };

    const devices = useSelector(state => state.devices)
    const thisDevice = devices.find(device => device.id === deviceId);
    const thisDisk = thisDevice.disk.find(disk => disk.mounted === diskName)

    const handleOnClick = (inputText) => {
        setShowConfirmation(true)
        setInpText(inputText);
    }

return (
    <>
    <Modal  
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='modal-fullscreen-sm-down' 
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Диск {diskName} Компьютер {device.name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <UnlockDisk />
        <ActivationOff />
        <ActivationOn /> */}
            {thisDisk.locked
                ? <ButtonAndPassword 
                    name={'розблокувати диск'} 
                    deviceId={deviceId}
                    diskName={diskName}
                    commandKey={'unlock'}
                    input={true}
                    password={password}
                    setPassword={setPassword}
                    inputText={`Unlock-BitLocker -MountPoint "${diskName}" -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force)`}
                    handleOnClick={handleOnClick}
                />
                : thisDisk.crypt
                    ? <ButtonAndPassword 
                        name={'вимкнути шифрування'} 
                        deviceId={deviceId}
                        diskName={diskName}
                        commandKey={'disable'} 
                        input={false}
                        password={password}
                        setPassword={setPassword}
                        inputText={`Disable-BitLocker -MountPoint "${diskName}"`}
                        handleOnClick={handleOnClick}
                    />
                    : <ButtonAndPassword 
                        name={'активувати шифрування'} 
                        deviceId={deviceId}
                        diskName={diskName}
                        commandKey={'enable'}
                        input={true}
                        password={password}
                        setPassword={setPassword}
                        inputText={`Enable-BitLocker -MountPoint "${diskName}" -PasswordProtector -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`}
                        handleOnClick={handleOnClick}
                    />
            }
        </Modal.Body>
    </Modal>
    <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={() => handleConfirm()}
     />
    </>
)};

export default DiskMenu;
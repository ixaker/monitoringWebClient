import React , {useState} from 'react';
import { useSelector } from 'react-redux';
import './devicemenu.css'
import { sendDataToServer } from './../../components/SocketConection';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const DiskMenu = ({ diskName, deviceId, show, onHide, device}) => {
    const handleOnClick = (inputText, deviceId) => {
        console.log('sendDataToServer from deviceMenu');
        console.log(inputText);
        console.log(deviceId);
        sendDataToServer({inputText, deviceId})
    }

    const devices = useSelector(state => state.devices)
    console.log(devices[deviceId]);

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

const createCommandsArray = (password, diskName, key) => {
    const commands = {
        "enable": `Enable-BitLocker -MountPoint "${diskName}" -PasswordProtector -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`,
        "disable": `Disable-BitLocker -MountPoint "${diskName}"`,
        "unlock": `Unlock-BitLocker -MountPoint "${diskName}" -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force)`
    };
    return commands[key];
};

const ButtonAndPassword = ({ name, deviceId, diskName, commandKey, input }) => {
    const [password, setPassword] = useState('');
    const inputText = createCommandsArray(password, diskName, commandKey);
    // const inputText = `Enable-BitLocker -MountPoint "${diskName}" -PasswordProtector -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`;
    const handleOnClick = () => {
        sendDataToServer({ inputText, deviceId });
    };

    return (
        
        <div className=''>
            
            <Form.Group className='mb-2'>
                <Button 
                        variant="outline-primary" 
                        className='w-100 mb-2' 
                        onClick={handleOnClick}>
                    {name}
                </Button>
                {input 
                    ? <Form.Control
                        variant="outline-primary"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="введіть пароль (не менше 8 символів)"
                        autoComplete="off"
                    />
                    : ""
                }
                
            </Form.Group>
        </div>
        
    );
};

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
            Диск {diskName} Компьютер {device.name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                {true
                    ? <ButtonAndPassword 
                        name={'вимкнути шифрування'} 
                        deviceId={deviceId}
                        diskName={diskName}
                        commandKey={'disable'} 
                        input={false}
                      />
                    : <ButtonAndPassword 
                        name={'активувати шифрування'} 
                        deviceId={deviceId}
                        diskName={diskName}
                        commandKey={'enable'}
                        input={true}
                      />
                }
                
                
                <ButtonAndPassword 
                    name={'розблокувати диск'} 
                    deviceId={deviceId}
                    diskName={diskName}
                    commandKey={'unlock'}
                    input={true}
                />
        </Modal.Body>
    
        {/* <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer> */}
    </Modal>
);
};

export default DiskMenu;
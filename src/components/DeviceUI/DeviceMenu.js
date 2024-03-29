import React from 'react';
import './devicemenu.css'
import { sendDataToServer } from './../../components/SocketConection';
import Button from 'react-bootstrap/Button';

const DeviceMenu = ({ deviceId }) => {
    
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
        <div className='menu-container'>
            <MenuButton 
                name={'hostname'} 
                command={'hostname'}
            />
            <MenuButton 
                name={'second'} 
                command={'hostname'}
            />

            <MenuButton 
                name={'third'} 
                command={'hostname'}
            />
            
        </div>
    );
};

export default DeviceMenu;
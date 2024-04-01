import React , {useState} from 'react';
import { Form, Button } from 'react-bootstrap'; // Припускаю, що ви використовуєте Bootstrap

const ButtonAndPassword = ({ name, deviceId, diskName, commandKey, input }) => {
    const [password, setPassword] = useState('');

    const createCommandsArray = (password, diskName, key) => {
        const commands = {
            "enable": `Enable-BitLocker -MountPoint "${diskName}" -PasswordProtector -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`,
            "disable": `Disable-BitLocker -MountPoint "${diskName}"`,
            "unlock": `Unlock-BitLocker -MountPoint "${diskName}" -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force)`
        };
        return commands[key];
    };

    const inputText = createCommandsArray(password, diskName, commandKey);
    // const inputText = `Enable-BitLocker -MountPoint "${diskName}" -PasswordProtector -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`;
    const handleOnClick = () => {
        sendDataToServer({ inputText, deviceId });
    };

    return (
        
        <div className=''>
            
            <Form.Group className='mb-2'>
                {input 
                        ? <Form.Control
                            variant="outline-primary"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="введіть пароль (не менше 8 символів)"
                            autoComplete="off"
                            className='mb-2'
                        />
                        : ""
                    }
                <Button 
                        variant="outline-primary" 
                        className='w-100 mb-2' 
                        onClick={handleOnClick}>
                    {name}
                </Button>
                
                
            </Form.Group>
        </div>
        
    );
};

export default ButtonAndPassword;
import React, { useState, useRef, useEffect } from 'react';

// components
import DeviceInputForm from './secondaryComponents/DeviceInputForm/DeviceInputForm';


import GraphicContainer from '../GraphicContainer/GraphicContainer';

import DeviceMenu from './DeviceMenu';
import DiskMenuItem from './DiskMenuItem';
import DiskUI from './DiskUI';
import DeviceInfo from './DeviceInfo';

const DeviceUi = ({
    ip,
    discs,
    device,
    devices
}) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [loaders, setLoaders] = useState({});

    const handleShow = (deviceId) => {
        setModalShow(prevState => ({
            ...prevState,
            [deviceId]: true
        }));
    };

    const handleHide = (deviceId) => {
        setModalShow(prevState => ({
            ...prevState,
            [deviceId]: false
        }));
    };

    return (
        <div>
            {
                devices.map(device => (
                    <div key={device.id} className="position-relative container mb-4 border rounded p-3 pb-2 bg-dark-subtle align-items-center shadow" style={{ border: "2px solid red" }}>
                        <DeviceMenu
                            deviceId={device.id}
                            device={device}
                            show={modalShow[device.id] || false}
                            onHide={() => handleHide(device.id)}
                        />

                        <DeviceInfo
                            device={device}
                            setModalShow={() => handleShow(device.id)}
                        />

                        <p className="mb-1">{ip}</p>

                        {device.disk.map((disk, index) => (
                            <DiskUI key={`${device.id}-${disk.mounted}`} disk={disk} index={index} device={device} setLoaders={setLoaders} />
                        ))}

                        {/* <GraphicContainer data={device.CPU} name="CPU" /> */}
                        {/* <GraphicContainer data={device.RAM} name="RAM" /> */}
                        {/* <DeviceInputForm
                            deviceId={device.id}
                        /> */}

                    </div>
                ))
            }
        </div>
    );
};

export default DeviceUi;
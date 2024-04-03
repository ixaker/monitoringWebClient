import React, { useState, useEffect } from 'react';
import DiskMenu from './DiskMenu';
import { AiOutlineSetting } from "react-icons/ai";

const DiskMenuItem = ({ deviceId, diskName, device, diskCrypt, setLoaders}) => {
    // const [openDiskMenu, setOpenDiskMenu] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);
    const toggleDiskMenu = () => {
        if (device.online) {
            // setOpenDiskMenu(!openDiskMenu);
            setModalShow(true)
        }
    };

    const hideModal = () => {
        setModalShow(false);
    };

    return (
        <div className="disk-menu-item">
            <div onClick={toggleDiskMenu}>
                <AiOutlineSetting className="display-6" />
            </div>
            <DiskMenu 
                device={device}
                deviceId={deviceId} 
                diskName={diskName} 
                show={modalShow}
                onHidePrevious={hideModal}
                setModalShow={setModalShow}
                onHide={() => setModalShow(false)}
                setLoaders={setLoaders}
            />
        </div>
    );
};

export default DiskMenuItem;
import React, { useState, useEffect } from 'react';
import DiskMenu from './DiskMenu';
import { AiOutlineSetting } from "react-icons/ai";

const DiskMenuItem = ({ deviceId, diskName, device, diskCrypt}) => {
    const [openDiskMenu, setOpenDiskMenu] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);

    const toggleDiskMenu = () => {
        setOpenDiskMenu(!openDiskMenu);
        setModalShow(true)
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
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default DiskMenuItem;
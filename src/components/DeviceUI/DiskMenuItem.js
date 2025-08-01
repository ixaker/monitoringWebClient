import React, { useState } from 'react';
import DiskMenu from './DiskMenu';
import { AiOutlineSetting } from 'react-icons/ai';

const DiskMenuItem = ({ deviceId, diskName, device, setLoaders }) => {
  const [modalShow, setModalShow] = useState(false);
  const toggleDiskMenu = () => {
    if (device.online) {
      setModalShow(true);
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

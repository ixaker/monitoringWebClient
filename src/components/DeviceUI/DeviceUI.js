import React, { useState } from "react";
import DeviceMenu from "./DeviceMenu";
import DiskUI from "./DiskUI";
import DeviceInfo from "./DeviceInfo";

const DeviceUi = ({ ip, devices }) => {
  const [modalShow, setModalShow] = useState({});
  const [visibleDisks, setVisibleDisks] = useState({});
  const [loaders, setLoaders] = useState({});
  const [renameDeviceId, setRenameDeviceId] = useState(null);

  const handleShow = (deviceId) => {
    setModalShow((prevState) => ({
      ...prevState,
      [deviceId]: true,
    }));
  };

  const toggleDiskVisibility = (deviceId) => {
    console.log("toggleDiskVisibility", deviceId);
    setVisibleDisks((prevState) => ({
      ...prevState,
      [deviceId]: !prevState[deviceId],
    }));
  };

  const handleHide = (deviceId) => {
    setModalShow((prevState) => ({
      ...prevState,
      [deviceId]: false,
    }));
  };

  const rename = (deviceId) => {
    setRenameDeviceId(deviceId);
  };

  return (
    <div>
      {devices.map((device) => (
        <div
          key={device.id}
          className={`position-relative container mb-2 border rounded p-1 bg-dark-subtle align-items-center customShadow ${
            loaders[device.id] ? "opacity-75" : ""
          }`}
        >
          <DeviceMenu
            deviceId={device.id}
            device={device}
            show={modalShow[device.id] || false}
            onHide={() => handleHide(device.id)}
            online={device.online}
            rename={() => rename(device.id)}
            loaders={loaders}
            setLoaders={setLoaders}
          />

          <DeviceInfo
            device={device}
            setModalShow={() => handleShow(device.id)}
            onClick={() => toggleDiskVisibility(device.id)}
            renameDeviceId={renameDeviceId}
            setRenameDeviceId={setRenameDeviceId}
          />

          {visibleDisks[device.id] &&
            device.disk.map((disk, index) => (
              <React.Fragment key={`${device.id}-${disk.mounted}`}>
                <p className="mb-1">{ip}</p>
                <DiskUI
                  key={`${device.id}-${disk.mounted}`}
                  disk={disk}
                  index={index}
                  device={device}
                  setLoaders={setLoaders}
                />
              </React.Fragment>
            ))}
        </div>
      ))}
    </div>
  );
};

export default DeviceUi;

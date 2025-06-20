import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import UnlockDisk from "../DiskActions/UnlockDisk";
import ActivationOff from "../DiskActions/ActivationOff";
import ActivationOn from "../DiskActions/ActivationOn";
import ConfirmationModal from "../confirmationModal/confirmationModal";

const DiskMenu = ({
  diskName,
  deviceId,
  show,
  onHide,
  device,
  onHidePrevious,
  setLoaders,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inpText, setInpText] = useState("");

  const devices = useSelector((state) => state.devices);
  const thisDevice = devices.find((device) => device.id === deviceId);
  const thisDisk = thisDevice.disk.find((disk) => disk.mounted === diskName);

  const handleConfirm = () => {
    console.log("handleConfirm in diskMenu");
    console.log(inpText);
    sendDataToServer({ inputText: inpText, deviceId, setLoaders });
    setShowConfirmation(false);
    onHidePrevious();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-fullscreen-sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Диск {diskName} Компьютер {device.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {thisDisk.locked ? (
            <UnlockDisk
              deviceId={deviceId}
              onHidePrevious={onHidePrevious}
              diskName={diskName}
            />
          ) : thisDisk.crypt ? (
            <ActivationOff
              deviceId={deviceId}
              onHidePrevious={onHidePrevious}
              diskName={diskName}
              device={device}
            />
          ) : (
            <ActivationOn
              deviceId={deviceId}
              onHidePrevious={onHidePrevious}
              diskName={diskName}
              setLoaders={setLoaders}
            />
          )}
        </Modal.Body>
      </Modal>

      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DiskMenu;

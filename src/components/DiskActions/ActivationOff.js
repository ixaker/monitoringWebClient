import React, { useState } from "react";
import MyButton from "../UI/MyButton";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import { sendDataToServer } from "../SocketConection";

const ActivationOff = ({ deviceId, diskName, onHidePrevious, device }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const inputText = `Disable-BitLocker -MountPoint "${diskName}"`;

  const handleConfirm = () => {
    sendDataToServer({ inputText, deviceId });
    setShowConfirmation(false);
    onHidePrevious(); //close parent modal
  };

  const handleOnClick = (inputText) => {
    setShowConfirmation(true);
  };

  const disabled = false;
  return (
    <>
      <MyButton
        buttonText="Вимкнути шифрування"
        disabled={disabled}
        handleOnClick={handleOnClick}
      />
      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={() => handleConfirm()}
        title="Розблокувати диск"
        message={`Ви намагаєтесь розблокувати диск ${diskName.slice(
          0,
          -1
        )} на компьютері ${device.name}`}
      />
    </>
  );
};

export default ActivationOff;

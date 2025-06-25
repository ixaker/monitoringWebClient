import React, { useState } from "react";
import MyButton from "../UI/MyButton";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import { sendDataToServer } from "../SocketConection";

const ActivationOff = ({ deviceId, diskName, onHidePrevious, device }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    const command = `Disable-BitLocker -MountPoint "${diskName}"`;
    sendDataToServer({ inputText: command, deviceId });
    setShowConfirmation(false);
    onHidePrevious(); //close parent modal
  };

  const handleOnClick = () => {
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
        title="Розблокувати диск?"
        message={`Дешифрування диску ${diskName.slice(0, -1)} на компьютері ${
          device.name
        } може зайняти певний час`}
      />
    </>
  );
};

export default ActivationOff;

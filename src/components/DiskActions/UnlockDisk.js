import React, { useState } from "react";
import { Form } from "react-bootstrap";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import { sendDataToServer } from "../SocketConection";

const UnlockDisk = ({ deviceId, diskName, onHidePrevious }) => {
  const [value, setValue] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isPasswordValid =
    value.length >= 8 ? true : value.length > 0 ? false : "";
  //text of command for device
  const inputText = `Unlock-BitLocker -MountPoint "${diskName}" -Password (ConvertTo-SecureString -String "${value}" -AsPlainText -Force)`;

  const handleConfirm = () => {
    sendDataToServer({ inputText, deviceId });
    setShowConfirmation(false);
    onHidePrevious(); //close parent modal
  };

  const handleOnClick = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="">
      <Form.Group className="mb-2">
        <MyInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isPasswordValid={isPasswordValid}
          autoFocus={true}
        />
        <MyButton
          buttonText="Розблокувати диск"
          disabled={!isPasswordValid}
          handleOnClick={handleOnClick}
        />
      </Form.Group>
      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={() => handleConfirm()}
      />
    </div>
  );
};

export default UnlockDisk;

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import { sendDataToServer } from "../SocketConection";

const ActivationOn = ({ deviceId, diskName, onHidePrevious, setLoaders }) => {
  const [value, setValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isPasswordValid =
    value.length >= 8 ? true : value.length > 0 ? false : "";
  const isPasswordMatch = secondValue === "" ? "" : secondValue === value;
  const passwordsMatchMessage = !isPasswordMatch ? "Паролі не співпадають" : "";
  //text of command for device

  const handleConfirm = () => {
    const command = `Enable-BitLocker -MountPoint "${diskName}" -PasswordProtector -Password (ConvertTo-SecureString -String "${value}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`;
    setValue("");
    setSecondValue("");
    sendDataToServer({ inputText: command, deviceId });
    setShowConfirmation(false);
    onHidePrevious(); //close parent modal
    setLoaders((prevState) => ({
      ...prevState,
      [deviceId]: true,
    }));

    const fallbackTimer = setTimeout(() => {
      setLoaders((prevState) => ({
        ...prevState,
        [deviceId]: false,
      }));
    }, 4000);

    return () => {
      clearTimeout(fallbackTimer);
    };
  };

  const handleOnClick = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      <Form.Group>
        <MyInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isPasswordValid={isPasswordValid}
          autoFocus={true}
        />
        <MyInput
          value={secondValue}
          isPasswordValid={isPasswordMatch}
          onChange={(e) => setSecondValue(e.target.value)}
          placeholderText={"повторіть пароль"}
          errorMessage={passwordsMatchMessage}
        />
        <MyButton
          buttonText="Активувати шифрування"
          disabled={!isPasswordValid || !isPasswordMatch}
          handleOnClick={handleOnClick}
          showLoader={false}
        />
      </Form.Group>
      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={() => handleConfirm()}
        message={`Ви хочете зашифрувати диск ${diskName.slice(
          0,
          -1
        )}. Переконайтесь, що пароль для шифрування надійно збережений!`}
        title="Підтвердження шифрування"
      />
    </>
  );
};

export default ActivationOn;

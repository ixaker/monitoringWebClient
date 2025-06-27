import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import MyInput from "../UI/MyInput";
import MyButton from "../UI/MyButton";
import { sendDataToServer } from "../SocketConection";

const UnlockAllDisks = ({ devices }) => {
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Проверка валидности пароля
  const isPasswordValid =
    password.length >= 8 ? true : password.length > 0 ? false : "";

  // Получаем все зашифрованные диски на всех устройствах
  const getAllLockedDisks = () => {
    const lockedDisks = [];

    devices.forEach((device) => {
      if (device.disk && device.online) {
        device.disk.forEach((disk) => {
          if (disk.mounted !== "C:" && disk.locked) {
            lockedDisks.push({
              deviceId: device.id,
              diskName: disk.mounted,
              deviceName: device.name,
            });
          }
        });
      }
    });

    return lockedDisks;
  };

  const devicesWithLockedDisks = getAllLockedDisks().filter(
    (disk, index, array) => {
      return array.findIndex((d) => d.deviceId === disk.deviceId) === index;
    }
  );

  const totalCountLockDisks = getAllLockedDisks().length;

  const handleUnlockAllDisks = () => {
    setIsProcessing(true);
    const lockedDisks = getAllLockedDisks();

    if (lockedDisks.length === 0) {
      alert("Заблокованих дисків не знайдено");
      setIsProcessing(false);
      return;
    }

    lockedDisks.forEach(({ deviceId, diskName }) => {
      const command = `Unlock-BitLocker -MountPoint "${diskName}" -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force)`;
      sendDataToServer({ inputText: command, deviceId });
    });

    setIsProcessing(false);
    setShowConfirmation(false);
    setPassword("");
    setShowPasswordModal(false);
  };

  const handleOnClick = () => {
    setShowConfirmation(true);
  };

  const handleOnHide = () => {
    setShowPasswordModal(false);
    setPassword("");
  };

  return (
    <>
      {devicesWithLockedDisks.length > 0 && (
        <Button
          variant="success"
          size="lg"
          className="mb-4 d-flex flex-column align-items-center unlock-all-btn"
          onClick={() => setShowPasswordModal(true)}
          disabled={isProcessing}
        >
          <span className="mb-2">
            {isProcessing
              ? "Процес розблокування..."
              : "Розблокувати всі диски"}
          </span>
          <FontAwesomeIcon
            icon={faLockOpen}
            className="mb-2"
            style={{ fontSize: "50px" }}
            width="80px"
            height="80px"
          />
        </Button>
      )}

      <Modal show={showPasswordModal} onHide={handleOnHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Введіть пароль для розблокування</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <MyInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPasswordValid={isPasswordValid}
              placeholderText="введіть пароль (не менше 8 символів)"
              autoFocus={true}
            />
            {password.length > 0 && !isPasswordValid && (
              <div className="text-danger mt-2">Пароль занадто короткий</div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <MyButton
            buttonText="Розблокувати диски"
            disabled={!isPasswordValid}
            handleOnClick={handleOnClick}
          />
        </Modal.Footer>
      </Modal>

      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleUnlockAllDisks}
        message={`Буде розблоковано ${totalCountLockDisks} диск(и/ів) на ${devicesWithLockedDisks.length} пристро(ї/ях). Продовжити?`}
      />
    </>
  );
};

export default UnlockAllDisks;

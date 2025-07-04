import React, { useMemo, useState } from "react";
import "./devicemenu.css";
import {
  sendDataToServer,
  deleteDeviceFromServer,
} from "./../../components/SocketConection";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  faPowerOff,
  faRotateLeft,
  faTrash,
  faPenToSquare,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import { useDispatch } from "react-redux";
import { removeDevice } from "../../rtk/DevicesSlice";
import EncryptAllModal from "../DiskActions/EncryptAllModal";
import DecryptAllModal from "../DiskActions/DecryptAllModal";

const DeviceMenu = ({
  deviceId,
  show,
  onHide,
  device,
  rename,
  loaders,
  setLoaders,
}) => {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showEncryptAllModal, setShowEncryptAllModal] = useState(false);
  const [showDecryptAllModal, setShowDecryptAllModal] = useState(false);

  const handleOnClick = (command) => {
    if (command === "edit_name") {
      onHide();
      setTimeout(() => {
        rename();
      }, 300);

      return;
    }

    if (command === "encrypt_all") {
      setShowEncryptAllModal(true); // Показываем модальное окно шифрования
      onHide(); // Закрываем текущее меню
      return;
    }

    if (command === "decrypt_all") {
      setShowDecryptAllModal(true);
      onHide();
      return;
    }

    setShowConfirmation(true);
    setInputText(command);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    onHide();
    console.log("sendDataToServer", inputText);
    if (inputText === "delete_device") {
      deleteDeviceFromServer(deviceId);
      dispatch(removeDevice(deviceId));
    } else if (inputText === "edit_name") {
      rename();
    } else {
      sendDataToServer({ inputText, deviceId });
    }
  };

  const MenuButton = ({ name, command, svg }) => {
    return (
      <div
        className="menu-button"
        onClick={() => {
          handleOnClick(command);
        }}
      >
        <Button variant="" className="button-off btn-dark">
          <div className="btn-text">{name}</div>
          <div className="btn-svg">{svg}</div>
        </Button>{" "}
      </div>
    );
  };

  // Проверяем состояние дисков для определения нужной кнопки
  const hasEncryptedDisks = useMemo(() => {
    return device.disk?.some((disk) => disk.mounted !== "C:" && disk.crypt);
  }, [device.disk]);

  const hasUnencryptedDisks = useMemo(() => {
    return device.disk?.some((disk) => disk.mounted !== "C:" && !disk.crypt);
  }, [device.disk]);

  const renderEncryptDecryptButton = () => {
    if (hasUnencryptedDisks) {
      return (
        <MenuButton
          name={"зашифрувати"}
          command={"encrypt_all"}
          svg={<FontAwesomeIcon icon={faGear} />}
          style={{ flex: 1 }}
        />
      );
    } else if (hasEncryptedDisks) {
      return (
        <MenuButton
          name={"дешифрувати"}
          command={"decrypt_all"}
          svg={<FontAwesomeIcon icon={faGear} />}
          style={{ flex: 1 }}
        />
      );
    }
    return null; // Если все диски (кроме C:) в одном состоянии
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="fs-5">
            Компьютер {device.name}. {device.nickname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-3 pb-3">
          <div className="d-flex flex-column gap-3 align-items-center">
            {device.online ? (
              <>
                <div className="d-flex gap-4 justify-content-center">
                  <MenuButton
                    name={"вимкнути"}
                    svg={<FontAwesomeIcon icon={faPowerOff} />}
                    command={"shutdown /s /t 0"}
                    style={{ flex: 1 }}
                  />
                  <MenuButton
                    name={"перезавантажити"}
                    command={"shutdown /r /t 0"}
                    svg={<FontAwesomeIcon icon={faRotateLeft} />}
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="d-flex gap-4 justify-content-center">
                  <MenuButton
                    name={"перейменувати"}
                    command={"edit_name"}
                    svg={<FontAwesomeIcon icon={faPenToSquare} />}
                    style={{ flex: 1 }}
                  />
                  {renderEncryptDecryptButton()}
                </div>
              </>
            ) : (
              <MenuButton
                name={"видалити"}
                command={"delete_device"}
                svg={<FontAwesomeIcon icon={faTrash} />}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
      <EncryptAllModal
        show={showEncryptAllModal}
        onHide={() => setShowEncryptAllModal(false)}
        deviceId={deviceId}
        disks={device.disk}
        device={device}
        loaders={loaders}
        setLoaders={setLoaders}
      />
      <DecryptAllModal
        show={showDecryptAllModal}
        onHide={() => setShowDecryptAllModal(false)}
        deviceId={deviceId}
        disks={device.disk}
        device={device}
        loaders={loaders}
        setLoaders={setLoaders}
      />
      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        message={"Ви підтверджуєте дію?"}
      />
    </>
  );
};

export default DeviceMenu;

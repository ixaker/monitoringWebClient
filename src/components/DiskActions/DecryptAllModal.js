import React, { useEffect, useState } from "react";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import { Modal, ProgressBar } from "react-bootstrap";
import MyButton from "../UI/MyButton";
import { sendDataToServer } from "../SocketConection";

const DecryptAllModal = ({
  show,
  onHide,
  deviceId,
  device,
  disks,
  loaders,
  setLoaders,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentDisk, setCurrentDisk] = useState(null);

  const isDiskDecryptable = (disk) => disk.mounted !== "C:" && disk.crypt;
  const diskToDecrypt = disks.filter(isDiskDecryptable);
  const hasDiskToDecrypt = diskToDecrypt.length > 0;

  useEffect(() => {
    if (!show) {
      setProgress(0);
      setCurrentDisk(null);
    }
  }, [show]);

  const handleConfirmDecription = () => {
    setShowConfirmation(false);
    setProgress(0);
    setLoaders((prev) => ({ ...prev, [deviceId]: true }));

    diskToDecrypt.forEach((disk, index) => {
      setTimeout(() => {
        setCurrentDisk(disk.mounted);

        // Имитация прогресса для текущего диска
        const interval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev + 1;
            if (newProgress >= ((index + 1) / diskToDecrypt.length) * 100) {
              clearInterval(interval);
              if (index === diskToDecrypt.length - 1) {
                setTimeout(() => {
                  setLoaders((prev) => ({ ...prev, [deviceId]: false }));
                  onHide();
                }, 1000);
              }
              return ((index + 1) / diskToDecrypt.length) * 100;
            }
            return newProgress;
          });
        }, 500);

        const command = `Disable-BitLocker -MountPoint "${disk.mounted}"`;
        sendDataToServer({ inputText: command, deviceId });
      }, index * 1000);
    });
  };

  const isButtonDisabled = false;

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {loaders[deviceId]
              ? `Дешифрування (${Math.round(progress)}%)`
              : `Дешифрування дисків на компьютері ${device.name}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loaders[deviceId] ? (
            <div className="decryption-progress">
              <ProgressBar
                now={progress}
                label={`${Math.round(progress)}%`}
                animated
                striped
                className="mb-3 transition-all duration-500 ease-in-out"
              />
              {currentDisk && (
                <div className="text-center">
                  <small>Відбувається дешифрування дисків</small>
                </div>
              )}
            </div>
          ) : !hasDiskToDecrypt ? (
            <div className="text-danger">
              Дисків для дешифрування не виявлено.
            </div>
          ) : (
            <div>
              Буде дешифровано {diskToDecrypt.length} диск(и/ів).
              <br />
              <small className="text-muted">
                Натисніть "Вимкнути шифрування" для початку процесу.
              </small>
            </div>
          )}
        </Modal.Body>
        {!loaders[deviceId] && hasDiskToDecrypt && (
          <Modal.Footer>
            <MyButton
              buttonText="Вимкнути шифрування"
              disabled={isButtonDisabled}
              showLoader={false}
              handleOnClick={() => setShowConfirmation(true)}
            />
          </Modal.Footer>
        )}
      </Modal>
      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDecription}
        message={`Ви впевнені, що хочете розшифрувати ${diskToDecrypt.length} диск(и/ів) на комп'ютері ${device.name}?`}
      />
    </>
  );
};

export default DecryptAllModal;

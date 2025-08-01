import React, { useState, useEffect } from 'react';
import { Modal, Form, ProgressBar } from 'react-bootstrap';
import { sendDataToServer } from '../SocketConection';
import MyInput from '../UI/MyInput';
import MyButton from '../UI/MyButton';
import ConfirmationModal from '../confirmationModal/confirmationModal';

const EncryptAllModal = ({
  show,
  onHide,
  deviceId,
  disks,
  device,
  loaders,
  setLoaders,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentDisk, setCurrentDisk] = useState(null);

  // Проверка наличия дисков для шифрования (кроме C:)
  const isDiskEncryptable = (disk) => disk.mounted !== 'C:' && !disk.crypt;
  const disksToEncrypt = disks.filter(isDiskEncryptable);
  const hasDisksToEncrypt = disksToEncrypt.length > 0;

  // Проверка валидности пароля
  const isPasswordValid =
    password.length >= 8 ? true : password.length > 0 ? false : '';
  const doPasswordsMatch =
    confirmPassword === '' ? '' : confirmPassword === password;

  // Проверка всевозможных важриантов при которых кнопка будет отключена
  const isButtonDisabled =
    !hasDisksToEncrypt ||
    !isPasswordValid ||
    !doPasswordsMatch ||
    password === '' ||
    confirmPassword === '';

  // Эффект для сброса состояния при закрытии
  useEffect(() => {
    if (!show) {
      setProgress(0);
      setCurrentDisk(null);
    }
  }, [show]);

  const handleConfirmEncryption = () => {
    setPassword('');
    setConfirmPassword('');
    setShowConfirmation(false);
    setLoaders((prev) => ({ ...prev, [deviceId]: true }));
    setProgress(0);

    // Имитация процесса шифрования с прогрессом
    disksToEncrypt.forEach((disk, index) => {
      setTimeout(() => {
        setCurrentDisk(disk.mounted);

        // Имитация прогресса для текущего диска
        const interval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev + 1;
            if (newProgress >= ((index + 1) / disksToEncrypt.length) * 100) {
              clearInterval(interval);
              if (index === disksToEncrypt.length - 1) {
                setTimeout(() => {
                  setLoaders((prev) => ({ ...prev, [deviceId]: false }));
                  onHide();
                }, 1000);
              }
              return ((index + 1) / disksToEncrypt.length) * 100;
            }
            return newProgress;
          });
        }, 500);

        const command = `Enable-BitLocker -MountPoint "${disk.mounted}" -PasswordProtector -Password (ConvertTo-SecureString -String "${password}" -AsPlainText -Force) -UsedSpaceOnly -SkipHardwareTest`;
        sendDataToServer({ inputText: command, deviceId });
      }, index * 1000);
    });
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {loaders[deviceId]
              ? `Шифрування (${Math.round(progress)}%)`
              : `Шифрування дисків на компьютері ${device.name}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loaders[deviceId] ? (
            <div className="encryption-progress">
              <ProgressBar
                now={progress}
                label={`${Math.round(progress)}%`}
                animated
                striped
                className="mb-3 transition-all duration-500 ease-in-out"
              />
              {currentDisk && (
                <div className="text-center">
                  <small>Відбувається шифрування дисків</small>
                </div>
              )}
            </div>
          ) : !hasDisksToEncrypt ? (
            <div className="text-danger">
              Дисків для шифрування не виявлено. Всі диски (окрім диска С:)
              зашифровані.
            </div>
          ) : (
            <Form>
              <Form.Group>
                <MyInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isPasswordValid={isPasswordValid}
                  placeholderText={'введіть пароль (не менше 8 символів)'}
                  autoFocus={true}
                />
                {password.length > 0 && !isPasswordValid && (
                  <div className="text-danger">Пароль занадто короткий</div>
                )}
              </Form.Group>
              <Form.Group>
                <MyInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholderText={'повторіть пароль'}
                  isPasswordValid={doPasswordsMatch}
                  isInvalid={confirmPassword.length > 0 && !doPasswordsMatch}
                />
                {confirmPassword.length > 0 && !doPasswordsMatch && (
                  <div className="text-danger">Паролі не співпадають</div>
                )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        {!loaders[deviceId] && hasDisksToEncrypt && (
          <Modal.Footer>
            <MyButton
              buttonText="Активувати шифрування"
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
        onConfirm={handleConfirmEncryption}
        message={`Ви впевнені, що хочете зашифрувати ${disksToEncrypt.length} диск(и/ів) на комп'ютері ${device.name}?`}
      />
    </>
  );
};

export default EncryptAllModal;

import React, { useState } from 'react';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal } from 'react-bootstrap';
import { sendNewPassword } from '../SocketConection';
import ConfirmationModal from '../confirmationModal/confirmationModal';
import Loader from '../Loader/Loader';
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';

const UpdatePassword = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const isPasswordsMatches =
    repeatPassword === '' ? '' : repeatPassword === password;
  const passwordsMatchMessage = !isPasswordsMatches
    ? 'Паролі не співпадають'
    : '';
  // Функция проверки пароля
  const validatePassword = (pass) => {
    if (!pass) return 'Пароль не может бути порожнім';
    if (pass.length < 8) return 'Не менше 8 символів';
    if (pass.length > 32) return 'Максимум 32 символи';
    if (!/[A-Z]/.test(pass)) return 'Повинна бути хоча б одна заглавна літера';
    if (!/[a-z]/.test(pass)) return 'Повинна бути хоча б одна маленька літера';
    if (!/[0-9]/.test(pass)) return 'Повинна бути хоча б одна цифра';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass))
      return 'Повинен бути хоча б один спецсимвол';
    return '';
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleOnHide = () => {
    setShowPasswordModal(false);
    setPassword('');
    setRepeatPassword('');
    setPasswordError('');
  };

  const handleClick = () => {
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setButtonDisable(true);

    try {
      await sendNewPassword(password);
      console.log('New password sent successfully');
      handleOnHide();
    } catch (error) {
      console.error('Error sending new password:', error);
    } finally {
      setButtonDisable(false);
    }
  };

  const isPasswordValid =
    !passwordError && password.length >= 8
      ? true
      : passwordError && password.length
      ? false
      : '';

  return (
    <>
      <Modal show={showPasswordModal} onHide={handleOnHide}>
        <Modal.Header closeButton>
          <Modal.Title>Створіть новий пароль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <MyInput
              value={password.replace(/\s/g, '')}
              onChange={handlePasswordChange}
              isPasswordValid={isPasswordValid}
              autoFocus={true}
              placeholderText={'введіть новий пароль'}
              errorMessage={passwordError}
            />
            {/* <div className="mt-2 text-muted small">
              Вимоги: 8-32 символи, заглавні та рядкові літери, цифри,
              спецсимволи
            </div> */}
            <MyInput
              value={repeatPassword.replace(/\s/g, '')}
              onChange={(e) => setRepeatPassword(e.target.value)}
              isPasswordValid={isPasswordsMatches}
              placeholderText={'повторіть пароль'}
              errorMessage={passwordsMatchMessage}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <MyButton
            buttonText="Змінити пароль"
            handleOnClick={handleClick}
            disabled={buttonDisable || !isPasswordValid || !isPasswordsMatches}
          />
        </Modal.Footer>
      </Modal>

      <Button
        variant="primary"
        size="lg"
        onClick={() => setShowPasswordModal(true)}
        className="d-flex mb-4  flex-row align-items-center  justify-content-center btn-success w-100"
        disabled={buttonDisable}
      >
        <span className="my-3 me-3">Новий пароль</span>

        <span className=" d-flex p-0 flex-row align-items-center justify-content-center">
          {buttonDisable ? (
            <Loader color="text-secondary" />
          ) : (
            <FontAwesomeIcon icon={faKey} style={{ fontSize: '20px' }} />
          )}
        </span>
      </Button>
      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        title="Оновлення паролю!"
        message="Оновити пароль?"
      />
    </>
  );
};

export default UpdatePassword;

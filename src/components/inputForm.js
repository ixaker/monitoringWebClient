// Компонент з полям вводу та кнопкою відправки
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrUpdateDevice } from '@/rtk/DevicesSlice';
import io from 'socket.io-client';
import { sendDataToServer } from './SocketConection';

const DeviceInputForm = ({deviceId}) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');

  const handleSendButtonClick = () => {
    // Викликаємо функцію sendDataToServer з аргументами
    console.log(deviceId)
    sendDataToServer({inputText, deviceId});
    // Очищаємо поле вводу після натискання кнопки
    setInputText('');
  };  

  return (
    <div className="input-group mt-3">
      <input
        type="text"
        className="form-control"
        placeholder="Введіть дані"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="btn btn-primary ms-2"
        onClick={handleSendButtonClick}
      >
        Send
      </button>
    </div>
  );
};

export default DeviceInputForm;

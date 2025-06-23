// Компонент з полям вводу та кнопкою відправки
import React, { useState, useEffect } from "react";
import { sendDataToServer, subscribeToResult } from "../../../SocketConection";

const DeviceInputForm = ({ deviceId }) => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);

  const handleSendButtonClick = () => {
    // Викликаємо функцію sendDataToServer з аргументами
    console.log(deviceId, inputText);
    sendDataToServer({ inputText, deviceId });
    // Очищаємо поле вводу після натискання кнопки
    setInputText("");
  };

  useEffect(() => {
    // Підписка на події 'result'
    const unsubscribe = subscribeToResult((data) => {
      console.log("Received result:", data);
      setResult(data);
    });

    // Очищення підписки при розмонтуванні
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className="input-group mt-3"
    >
      <div
        style={{
          display: "flex",
        }}
      >
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
    </div>
  );
};

export default DeviceInputForm;

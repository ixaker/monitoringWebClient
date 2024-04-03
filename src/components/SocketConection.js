"use client"
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addOrUpdateDevice } from '@/rtk/DevicesSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let socket;

const SocketConection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io('wss://monitoring.qpart.com.ua:5000', {
        transport: ['websocket'],
        extraHeaders: {
          "type": "webclient",
        },
      },
    ); 
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // toast.success('Connected', {
      //   autoClose: 1000,
      //   hideProgressBar: true
      // });
    });

    // отримання повідомлень
    socket.on('message', (data) => {
      // const parsedData = JSON.parse(data);
      // console.log('Received message:', parsedData.payload);
      // toast.info(parsedData.payload.name || "undefined", {
      //   autoClose: 1000,
      //   hideProgressBar: true
      // });
      // const payload = parsedData.payload;
    });

    socket.on('info', (data) => {
      console.log('soketon info', data);
    });

    socket.on('webclient', (data) => {
      // console.log('webclient', data);
      console.log('Received message:', data);
      // toast.info(`Інфо: ${parsedData.payload.name || "undefined"}`, {
      //   autoClose: 2000,
      //   hideProgressBar: true
      // });
      if (data.topic === 'info') {
        dispatch(addOrUpdateDevice(data.payload))
      }
      if (data.topic === 'result') {
        console.log('result', data.result)
        // toast.success(`Результат: ${parsedData.payload.result || "undefined"}`, {
        //   autoClose: 1000,
        //   hideProgressBar: true
        // });
      }
    });

    socket.on('error', (error) => {
      console.error('WebSocket connection error:', error);
      console.error('WebSocket connection error:', error.code);
      // toast.error('Conection error', {
      //   autoClose: 10000,
      //   hideProgressBar: true
      // });
    });

    socket.on("connect_error", (error) => {
        console.error('Connect_error:', error.type, error);
        console.error('Connect_error:', error.type, error.code);
        console.error('Connect_error:', error.type, error.message);
        // toast.error('Conection error', {
        //   autoClose: 10000,
        //   hideProgressBar: true
        // });
    });

    return () => {
      socket.disconnect(); 
      // toast.warning('Disconnect', {
      //   autoClose: 3000,
      //   hideProgressBar: true
      // });
    };
  }, []);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default SocketConection;

export const sendDataToServer = ({inputText, deviceId}) => {
  console.log('sendDataToServer')
  console.log(inputText);
  console.log(deviceId);
  const data = {
    topic: "command",
    payload: inputText,
    id: deviceId
  };

  console.log(data);
  
  if (socket && socket.connected) {
      socket.emit('command', data);
      console.log('повідомлення відправлено');
  } else {
      console.error('Socket is not connected');
  }
};
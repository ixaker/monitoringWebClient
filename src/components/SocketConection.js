"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { addOrUpdateDevice } from '@/rtk/DevicesSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

let socket;

const SocketConection = ({ setLoaders }) => {
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const startConnectTime = performance.now();
    socket = io('wss://monitoring.qpart.com.ua:5000', {
      transport: ['websocket'],
      extraHeaders: {
        "type": "webclient",
      },
    },
    );

    const timeout = setTimeout(() => {
      if (!connected) {
        toast.error('Сервер не відповідає');
        console.log('Сервер не відповідає');
      }
    }, 5000);

    socket.on('connect', () => {
      const endConnectTime = performance.now();
      console.log(`Connected to WebSocket server in ${endConnectTime - startConnectTime}ms`);
      console.log('Connected to WebSocket server');
      setConnected(true);
      clearTimeout(timeout);
    });

    socket.on('unauthorized', (data) => {
      console.log('Unauthorized access:', data.message);
      console.log('Status code:', data.status);
    });


    socket.on('info', (data) => {
      console.log('soketon info', data);
    });

    socket.on('webclient', (data) => {
      const startMessageTime = performance.now();
      console.log('Received message:', data);

      if (data.topic === 'info') {
        dispatch(addOrUpdateDevice(data.payload))
      }
      if (data.topic === 'result') {
        console.log('result', data.result)
      }
      const endMessageTime = performance.now();
      console.log(`Message processed in ${endMessageTime - startMessageTime}ms`);
    });

    socket.on('error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    return () => {
      socket.disconnect();
      console.log('Disconnected from WebSocket server');
      clearTimeout(timeout);
    }
  }, []);

  return (
    <>
      <ToastContainer autoClose={100000} />
    </>
  );
};

export default SocketConection;

export const sendDataToServer = ({ inputText, deviceId }) => {
  console.log('sendDataToServer')
  const data = {
    topic: "command",
    payload: inputText,
    id: deviceId
  };
  console.log(data);

  if (socket && socket.connected) {
    const startSendTime = performance.now();
    socket.emit('command', data, () => {
      const endSendTime = performance.now();
      console.log(`Data sent in ${endSendTime - startSendTime}ms`)
    });
    console.log('повідомлення відправлено');
  } else {
    console.error('Socket is not connected');
  }
};

export const sendNickToServer = ({ nickName, deviceId }) => {
  console.log('sendNickToServer')
  const data = {
    topic: "nickname",
    payload: nickName,
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

export const sendTurnOffAll = () => {
  console.log('sendTurnOffAll')

  if (socket && socket.connected) {
    socket.emit('disable', {});
    console.log('повідомлення відправлено');
  } else {
    console.error('Socket is not connected');
  }
}

export const sendTelegram = () => {
  console.log('sendTelegram')

  if (socket && socket.connected) {
    socket.emit('telegram', 'Telegram message from web client');
    console.log('повідомлення відправлено');
  } else {
    console.error('Socket is not connected');
  }
}



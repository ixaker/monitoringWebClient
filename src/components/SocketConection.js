"use client"
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addOrUpdateDevice } from '@/rtk/DevicesSlice';
import { ToastContainer, toast } from 'react-toastify';
import { deleteAuthToken } from './Login/LogOut'
import 'react-toastify/dist/ReactToastify.css';


let socket;

const SocketConection = ({setLoaders}) => {
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
    });

    socket.on('unauthorized', (data) => {
      console.log('Unauthorized access:', data.message);
      console.log('Status code:', data.status);
      deleteAuthToken();
    });


    socket.on('info', (data) => {
      console.log('soketon info', data);
    });

    socket.on('webclient', (data) => {
      console.log('Received message:', data);

      if (data.topic === 'info') {
        dispatch(addOrUpdateDevice(data.payload))
      }
      if (data.topic === 'result') {
        console.log('result', data.result)

      }
    });

    socket.on('error', (error) => {
      console.error('WebSocket connection error:', error);
      console.error('WebSocket connection error:', error.code);

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
      console.log('disconect 111');
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

export const sendNickToServer = ({nickName, deviceId}) => {
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



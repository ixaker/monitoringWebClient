'use client';
import { addOrUpdateDevice } from '@/rtk/DevicesSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';
// import { deleteAuthToken } from './Login/LogOut';
import { clearToken } from '@/rtk/TokenSlice';
import 'react-toastify/dist/ReactToastify.css';

let socket;
const SocketConection = ({}) => {
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(false);
  let tokenFromStore = useSelector((state) => state.token.token);
  let tokenFromLocal;
  const dotenv_domain = process.env.NEXT_PUBLIC_DOTENV_DOMAIN;
  const dotenv_port = process.env.NEXT_PUBLIC_DOTENV_API_PORT
    ? parseInt(process.env.NEXT_PUBLIC_DOTENV_API_PORT, 10)
    : 443;

  if (typeof window !== 'undefined') {
    tokenFromLocal = localStorage.getItem('token');
  }
  let token = tokenFromStore || tokenFromLocal;
  const connectSocket = () => {
    console.log('ConnectSocket...');
    const authToken = token || 'no token';
    socket = io(`wss://${dotenv_domain}:${dotenv_port}`, {
      transport: ['websocket'],
      auth: { token: authToken },
      extraHeaders: { type: 'webclient' },
    });

    const timeout = setTimeout(() => {
      if (!connected) {
        toast.error('Сервер не відповідає');
        console.log('Сервер не відповідає');
      }
    }, 5000);

    socket.on('unauthorized', handleUnauthorized);
    socket.on('info', handleInfo);
    socket.on('webclient', handleWebClient);
    socket.on('error', handleError);
    socket.on('connect', handleConnect);

    function handleUnauthorized(data) {
      console.log('Unauthorized access:', data.message);
      console.log('Status code:', data.status);
      dispatch(clearToken());
    }

    function handleInfo(data) {
      console.log('Socket info:', data);
    }

    function handleWebClient(data) {
      const { topic, payload } = data;
      if (topic === 'info') {
        dispatch(addOrUpdateDevice(payload));
      } else if (topic === 'result') {
        console.log('Result:', data.result);
      }
    }

    function handleError(error) {
      console.error('WebSocket connection error:', error);
    }

    function handleConnect() {
      clearTimeout(timeout);
      console.log('WebSocket connected');
      console.log('Socket id:', socket.id);
      console.log('Socket URL:', socket.io.uri);
      setConnected(true);
      socket.emit('getList', { getlist: true });
    }
  };

  useEffect(() => {
    console.log('UseEffect SocketConnection start...');
    connectSocket();
    if (socket) {
      socket.on('disconnect', handleDisconnect);
    }

    function handleDisconnect() {
      console.log('WebSocket disconnected');
      setConnected(false);
    }

    return () => {
      if (socket) {
        socket.off('disconnect', handleDisconnect);
      }
    };
  }, [token]);

  return <ToastContainer autoClose={100000} />;
};

export default SocketConection;

export const sendDataToServer = ({ inputText, deviceId }) => {
  console.log('sendDataToServer');
  const data = {
    topic: 'command',
    payload: inputText,
    id: deviceId,
  };
  console.log(data);

  if (socket && socket.connected) {
    const startSendTime = performance.now();
    socket.emit('command', data, () => {
      const endSendTime = performance.now();
      console.log(`Data sent in ${endSendTime - startSendTime}ms`);
    });
    console.log('повідомлення відправлено');
  } else {
    console.error('Socket is not connected');
  }
};

export const sendNickToServer = ({ nickName, deviceId }) => {
  console.log('sendNickToServer');
  const data = {
    topic: 'nickname',
    payload: nickName,
    id: deviceId,
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
  console.log('sendTurnOffAll');

  if (socket && socket.connected) {
    socket.emit('disable', {});
    console.log('повідомлення відправлено');
  } else {
    console.error('Socket is not connected');
  }
};

export const sendTelegram = () => {
  console.log('sendTelegram');

  if (socket && socket.connected) {
    socket.emit('telegram', 'Telegram message from web client');
    console.log('повідомлення відправлено');
  } else {
    console.error('Socket is not connected');
  }
};

export const sendUpdateEvent = () => {
  const payload = { command: 'git pull' };

  if (socket && socket.connected) {
    socket.emit('update', payload);
    console.log('Update event sent');
  } else {
    console.error('Socket is not connected');
  }
};

export const deleteDeviceFromServer = (deviceId) => {
  console.log('deleteDevice');
  if (socket && socket.connected) {
    socket.emit('delete_device', { deviceId }, (response) => {
      console.log('Response from server:', response);
    });
  } else {
    console.error('Socket is not connected');
  }
};

export const sendNewPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Проверка соединения
    if (!socket?.connected) {
      toast.error(`З'єднання з сервером відсутнє`);
      return reject(new Error('Socket not connected'));
    }

    // 3. Таймаут
    const timeout = setTimeout(() => {
      toast.error('Сервер не відповідає, спробуйте пізніше');
      reject(new Error('Timeout'));
    }, 10000);

    // 4. Отправка запроса
    socket.emit('change_password', { newPassword: password }, (response) => {
      clearTimeout(timeout);

      // 5. Проверка ответа
      if (!response) {
        toast.error('Не вдалося змінити пароль (немає відповіді)');
        return reject(new Error('No response'));
      }

      // 6. Явная проверка success === false
      if (response.success === false) {
        toast.error(response.message || 'Помилка при зміні паролю');
        return reject(new Error(response.message || 'Password change failed'));
      }

      // 7. Успешный случай
      if (response.success) {
        toast.success('Пароль успішно змінено!');
        return resolve(response);
      }

      // 8. Неожиданный формат ответа
      toast.error('Невідома помилка');
      reject(new Error('Invalid response format'));
    });
  });
};

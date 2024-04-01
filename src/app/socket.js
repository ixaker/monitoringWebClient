import io from 'socket.io-client';

const socket = io('monitoring.qpart.com.ua:5000'); // Підключення до сервера, якщо він працює на тому ж хості і порту

// Якщо сервер знаходиться на іншому хості або порті, можна передати адресу сервера як аргумент до io()
// const socket = io('http://адреса-сервера:порт');

// Обробник події підключення
socket.on('connect', () => {
  console.log('Connected to server!');
});

// Обробник події відключення
socket.on('disconnect', () => {
  console.log('Disconnected from server!');
});

// Якщо потрібно відправити дані на сервер
// socket.emit('назва-події', дані);

// Якщо потрібно отримувати дані від сервера
// socket.on('назва-події', (дані) => {
//   // Обробка отриманих даних
// });

export default socket;
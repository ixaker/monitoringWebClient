import React from 'react';

const Online = ({ online, timeLastInfo, uptime }) => {

  const formatTime = (timeLastInfo) => {
    const date = new Date(timeLastInfo); 
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}.${month} ${hours}:${minutes}`;
  }
  

  return (
    <div>
      {online 
        ? <span style={{ color: 'black' }}>Онлайн. Працює вже {uptime}</span> 
        : <span style={{ color: 'grey' }}>Офлайн. Останній раз в мережі {formatTime(timeLastInfo)}</span>}
    </div>
  );
};

export default Online;

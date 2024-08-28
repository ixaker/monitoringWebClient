import React from 'react';

const Online = ({ online, timeLastInfo, uptime, version }) => {

  const textVersion = version ? `V${version}` : '';

  const formatTime = (timeLastInfo) => {
    const date = new Date(timeLastInfo);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}.${month} ${hours}:${minutes}`;
  }

  const statusText = online
    ? `Онлайн. Працює вже ${uptime}`
    : `Офлайн. Останній раз в мережі ${formatTime(timeLastInfo)}`;

  return (
    <div style={{ color: online ? 'black' : 'grey', display: 'flex', width: '100%' }}>
      <span>{statusText}</span> <span style={{ marginLeft: 'auto' }}>{textVersion}</span>
    </div>
  );
};

export default Online;

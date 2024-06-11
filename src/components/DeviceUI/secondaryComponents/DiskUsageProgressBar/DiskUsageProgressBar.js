import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './diskUsage.css';

const DiskUsageProgressBar = ({ usedSpace, totalSpace, availableSpace }) => {
  const usedNumber = Math.round(usedSpace);
  const maxNumber = totalSpace === 0 ? 1 : Math.round(totalSpace);
  const nowNumber = Math.round(usedSpace)
  const label = `${availableSpace} ГБ вільно з ${maxNumber} ГБ`;

  return (
    <div className="progress-container">
      <ProgressBar
        now={nowNumber}
        max={maxNumber}
        className='bg-secondary '
        style={{
          color: 'grey',
          height: '15px',
        }}
      />
      <span className="progress-label ">{label}</span>
    </div>
  );
};

export default DiskUsageProgressBar;
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loader({size}) {
  return (
    
      <Spinner animation="border" role="status" variant="primary" size={size}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    
  );
}

export default Loader;

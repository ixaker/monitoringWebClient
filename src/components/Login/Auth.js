import React, { useEffect, useState } from 'react';
import Login from './Login';
import LogOut from './LogOut';

const AuthComponent = ({token}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setShow(!token);
  }, [token]);

  return !show ? (
    <LogOut setShow={setShow} />
  ) : (
    <Login setShow={setShow} show={show} />
  );
};

export default AuthComponent;

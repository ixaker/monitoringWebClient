// components/AlertMessage.js
import React from 'react';
import { ToastContainer, toast, Slide, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PushNotification = () => {
  const notify = () => toast("Hello World!", {autoClose: 1000});

  return (
    <div>
      <button onClick={notify}>Show Notification</button>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Bounce}
      />
    </div>
  );
};

export default PushNotification;
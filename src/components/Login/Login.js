import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import LoginForm from './LoginForm'

const Login = () => {

    const [show, setShow] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setShow(!token);
        
    },);

    return(
        <Modal  
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal-fullscreen-sm-down modal-bg-opacity-50' 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.90)' }} 
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Увійти
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LoginForm/>
        </Modal.Body>
    </Modal>
    )
}

export default Login
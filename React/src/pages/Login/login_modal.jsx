import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LoginModal({show, handleClose, onAddUser, onLoginUser}){

    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [form_type, setForm_type] = useState('login');
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
        if(form_type === 'login'){
            const userdata = { username, password };
            onLoginUser(userdata);
        }else{
            const newuserdata = { username, email, password };
            onAddUser(newuserdata);
        }
  };


  const handleRedirect = () => {
    if(form_type === 'register'){
      setForm_type('login');
      navigate('/login');
    }else{
      setForm_type('register');
      navigate('/login');
    }
  };

  const handleUsernameNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  return (
        <>
      <Modal show={show} onHide={handleClose} form_type={form_type}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
        {form_type === 'login' && (
          <Modal.Title>{t('modals.login.titleL')}</Modal.Title>
        )}
        {form_type === 'register' && (
          <Modal.Title>{t('modals.login.titleR')}</Modal.Title>
        )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            {form_type === 'login' && (
              <Form.Group className="mb-3" controlId="login">
                <Form.Label>{t('modals.login.username')}</Form.Label>
                <Form.Control  value={username}  type="text" placeholder='' onChange={handleUsernameNameChange}
                autoFocus />

                <Form.Label>{t('modals.login.password')}</Form.Label>
                <Form.Control value={password} type="password" placeholder='' onChange={handlePasswordChange}/>

              </Form.Group>
            )}
            {form_type === 'register' && (
              <Form.Group className="mb-3" controlId="register">
                <Form.Label>{t('modals.login.username')}</Form.Label>
                  <Form.Control value={username} type="text"  onChange={handleUsernameNameChange}/>
                
                <Form.Label>{t('modals.login.email')}</Form.Label>
                  <Form.Control value={email} type="email" onChange={handleEmailChange} />
                
                <Form.Label>{t('modals.login.password')}</Form.Label>
                  <Form.Control value={password} type="password" onChange={handlePasswordChange} />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
      <Modal.Footer>
      {form_type === 'login' && (
        <a onClick={handleRedirect} className='mb-3'>{t('modals.login.changeRegister')}</a>
      )}
      {form_type === 'register' && (
        <a onClick={handleRedirect} className='mb-3'>{t('modals.login.changeLogin')}</a>
      )}
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.login.close')}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {form_type === 'login' && (
            <span>{t('modals.login.logIn')}</span>
          )}
          {form_type === 'register' && (
            <span>{t('modals.login.register')}</span>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default LoginModal;
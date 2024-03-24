import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginModal from "./login_modal";
import LoginCSS from "./login.module.css"
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation();
    const { isCorrect, useRegister, useLogin } = useAuth();
    const handleClose = () => setShow(false);
    const [id, setId] = useState(null);
    const [show, setShow] = useState(true);
    const form_type = 'login';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/home');
        }
    }, [isCorrect, navigate]);

    const emit_register = (userData) => {
        useRegister(userData);
    }

    const emit_login = (userdata) => {
            useLogin(userdata);
            const username = userdata.username;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${username} ${t('alerts.login')}`,
                showConfirmButton: false,
                timer: 3500
            });
    }
    return (
        <>
            <div className={LoginCSS.background}>
                <LoginModal form_type={form_type} show={show} onAddUser={emit_register} onLoginUser={emit_login} handleClose={handleClose} />
            </div>        
        </>
    )
}

export default Login;
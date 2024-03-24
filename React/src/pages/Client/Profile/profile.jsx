import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import AuthContext from '../../../context/AuthContext';
import { useAuth } from '../../../hooks/useAuth';
import { useReservation } from '../../../hooks/useReservation';
// import { useApartments } from '../../../hooks/useApartments'
import { useNotifications } from '../../../hooks/useNotifications';
import ProfileCSS from './profile.module.css';
import IncidenceModal from './IncidenceModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";

export default function Profile() {
    const { t } = useTranslation();
    const id = useParams();
    const [type_list, setTypeList] = useState(0);
    const { useReservationByUser, reservations, useDeleteReservation } = useReservation();
    const { seenNotifications, notSeenNotifications , useSeenNotifications, useNotSeenNotifications, useSetSeenNotifications, useDeleteNotification } = useNotifications();
    const { user } = useContext(AuthContext);
    const { useProfile, profile } = useAuth();
    const [showModal, setShowModal] = useState(false);

    useEffect(function () {
        if(localStorage.getItem('type_list') !== null) {
            setTypeList(2);
        }    
    }, []);
    
    useEffect(function () {
        useProfile(id);
        useReservationByUser();
    }, []);

    useEffect(function () {
        useSeenNotifications();
    },[type_list===1]);

    useEffect(function () {
        useNotSeenNotifications();
    },[type_list===2]);
    
    const handleButtonClick = (id) => {
        setShowModal(true);
        console.log(id);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleclickdelete = (id) => {
        useDeleteReservation(id);
    }

    const handleSetSeenNotification = (id) => {
        useSetSeenNotifications(id);
    }

    const handleDeleteNotification = (id) => {
        useDeleteNotification(id);
    }

    const handleItemClick = (type) => {
        switch (type) {
            case 'Reservation':
                setTypeList(0);
                break;
            case 'Seen Notification':
                setTypeList(1);
                break;
            case 'Not Seen Notification':
                setTypeList(2);
                break;
            default:
                setTypeList(0);
        }
    };

    return (
        
        <div>
            <br></br>
            <br></br>
            <br></br>
            <header>
                <div className={ProfileCSS.container}>
                    <div className={ProfileCSS.profile}>
                        <div className={ProfileCSS.profileimage}>
                            <img src={profile.image} alt="" />
                        </div>

                        <div className={ProfileCSS.profileusersettings}>
                            <h1 className={ProfileCSS.profileusername}>
                                {t('profile.title')} <span className={ProfileCSS.profileusername2}>{profile.name}</span>
                            </h1>
                            <br/>
                            <div className={ProfileCSS.profileemail}>{user.email}</div>
                            <br/>
                        </div>

                        <div className={ProfileCSS.profilestats}>
                            <ul>
                                <li onClick={() => handleItemClick('Reservation')}>
                                    <span className={ProfileCSS.profilestatcount}></span> {t('profile.reservations')}
                                </li>
                                <li onClick={() => handleItemClick('Seen Notification')}>
                                    <span className={ProfileCSS.profilestatcount}></span> {t('profile.seen')}
                                </li>
                                <li onClick={() => handleItemClick('Not Seen Notification')}>
                                    <span className={ProfileCSS.profilestatcount}></span> {t('profile.notSeen')}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={ProfileCSS.reservationcards}>
                        {type_list === 0 && reservations.map((reservation, index) => (
                            <div key={index} className={ProfileCSS.card}>
                                <div className={ProfileCSS.cardinfo}>
                                    <h2>{t('profile.titleCard')} {reservation.apartment_id}</h2>
                                    <p>{t('profile.checkIn')} {reservation.f_ini}</p>
                                    <p>{t('profile.checkOut')} {reservation.f_end}</p>                                
                                    <div className={ProfileCSS.buttons}>
                                        <button 
                                            className={ProfileCSS.incidencebutton}
                                            onClick={() => handleButtonClick(reservation.apartment_id)}
                                        >
                                            {t('profile.incidenceButton')}
                                        </button>
                                        <IncidenceModal show={showModal} handleClose={handleCloseModal} id_apartment={reservation.apartment_id} />
                                        <button 
                                            className={ProfileCSS.deletebutton} 
                                            onClick={() => handleclickdelete(reservation.id)}
                                        >
                                            {t('profile.cancelButton')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {type_list === 1 && seenNotifications.map((notification, index) => (
                            <div key={index} className={ProfileCSS.card}>
                                <div className={ProfileCSS.cardinfo}>
                                    <h4>{notification.desc}</h4>
                                        {notification.desc.includes("resolved") ? (
                                            <div style={{ marginLeft: '20px' , marginTop: '20px' }}>
                                                <FontAwesomeIcon icon={faThumbsUp} size="4x" />
                                            </div>                                    
                                    ) : notification.desc.includes("in progress") ? (
                                            <div style={{ marginLeft: '20px' , marginTop: '20px' }}>
                                                <FontAwesomeIcon icon={faPersonRunning} size="4x" />
                                            </div>
                                    ) : null}
                                    <div className={ProfileCSS.buttons}>
                                        <button
                                            className={ProfileCSS.delete_notif} 
                                            onClick={() => handleDeleteNotification(notification.id)}
                                        >
                                            {t('profile.deleteButton')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        ))}
                        {type_list === 2 && notSeenNotifications.map((notification, index) => (
                            <div key={index} className={ProfileCSS.card}>
                                <div className={ProfileCSS.cardinfo}>
                                    <h4>{notification.desc}</h4>
                                        {notification.desc.includes("resolved") ? (
                                            <div style={{ marginLeft: '20px' , marginTop: '20px' }}>
                                                <FontAwesomeIcon icon={faThumbsUp} size="4x" />
                                            </div>                                   
                                    ) : notification.desc.includes("in progress") ? (
                                            <div style={{ marginLeft: '20px' , marginTop: '20px' }}>
                                                <FontAwesomeIcon icon={faPersonRunning} size="4x" />
                                            </div>
                                    ) : null}                     
                                    <div className={ProfileCSS.buttons}>
                                        <button
                                            className={ProfileCSS.delete_notif} 
                                            onClick={() => handleSetSeenNotification(notification.id)}
                                        >
                                            {t('profile.markAsSeenButton')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
            </header>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import HeaderCSS from './Header.module.css';
import AuthContext from '../../context/AuthContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import NotificationBell from './NotificationBell';
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2'
// import flagEnglish from '../../assets/country_imgs/reino-unido.png'
// import flagSpanish from '../../assets/country_imgs/espana.png';
// import flagFrench from '../../assets/country_imgs/francia.png';

export default function Header() {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const redirects = {

        home: () => navigate('/home'),
        //CLIENT
        cities: () => navigate('/cities'),
        zones: () => navigate('/zones'),
        apartments: () => navigate('/apartments'),

        //ADMIN
        admin_cities: () => navigate('/admin-cities'),
        admin_zones: () => navigate('/admin-zones'),
        admin_apartments: () => navigate('/admin-apartments'),
        admin_reservations: () => navigate('/admin-reservations'),
        admin_incidents: () => navigate('/admin-incidents'),

        login: () => navigate('/login'),
        logout: () => {
            logout();
            navigate('/home');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${t('alerts.logout')}`,
                showConfirmButton: false,
                timer: 3500
            });
        },

        profile: () => navigate('/profile/' + user.id)
    }

    const { user, isAuth, isAdmin, logout } = useContext(AuthContext);

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

    const handleLanguageChange = (event) => {
        const language = event.target.value;
        setSelectedLanguage(language);
        localStorage.setItem('selectedLanguage', language);
        i18n.changeLanguage(language);
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
        i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    return (
        <div className={HeaderCSS.top}>
    <div className="w3-bar w3-white w3-wide w3-padding w3-card">
        <a onClick={() => redirects.home()} className="w3-bar-item w3-button"><b>Aloja</b>BienTo</a>
        {
            isAdmin && <>
                <a onClick={() => redirects.admin_cities()} className="w3-bar-item w3-button">Adm-Cities</a>
                <a onClick={() => redirects.admin_zones()} className="w3-bar-item w3-button">Adm-Zones</a>
                <a onClick={() => redirects.admin_apartments()} className="w3-bar-item w3-button">Adm-Apartments</a>
                <a onClick={() => redirects.admin_reservations()} className="w3-bar-item w3-button">Adm-Reservations</a>
                <a onClick={() => redirects.admin_incidents()} className="w3-bar-item w3-button">Adm-Incidents</a>
            </>
        }
        {
            !isAdmin && <>
                <a onClick={() => redirects.home()} className="w3-bar-item w3-button">{t('header.home')}</a>
                <a onClick={() => redirects.cities()} className="w3-bar-item w3-button">{t('header.cities')}</a>
                <a onClick={() => redirects.zones()} className="w3-bar-item w3-button">{t('header.zones')}</a>
                <a onClick={() => redirects.apartments()} className="w3-bar-item w3-button">{t('header.apartments')}</a>
            </>
        }
        {
            (isAuth || isAdmin) && <>
                <div className="w3-right w3-hide-small">
                    <a className="w3-bar-item w3-button"> <NotificationBell /></a>
                    <a onClick={() => redirects.profile()} className="w3-bar-item w3-button"> <FontAwesomeIcon icon={faUser} /> {user.username} </a>
                    <a onClick={() => redirects.logout()} className="w3-bar-item w3-button">{t('header.logout')} <FontAwesomeIcon icon={faArrowRightToBracket} /></a>
                </div>
            </>
        }
        {
            !isAuth &&
            <div className="w3-right w3-hide-small">
                <a onClick={() => redirects.login()} className="w3-bar-item w3-button">{t('header.login')}</a>
            </div>
        }
        {
            !isAdmin && <>
                <div className="w3-right w3-hide-small">
                    <select 
                    className="w3-select" 
                    value={selectedLanguage} 
                    onChange={handleLanguageChange}>
                        <option value="en">{t('header.selectOptions.en')}</option>
                        <option value="es">{t('header.selectOptions.es')}</option>
                        <option value="fr">{t('header.selectOptions.fr')}</option>
                    </select>
                </div>
            </>
        }
    </div>
</div>

    )
}
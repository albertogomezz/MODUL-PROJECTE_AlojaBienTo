import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useApartments } from '../../../../hooks/useApartments';
import { useZones } from '../../../../hooks/useZones';
import { useContext } from 'react';
import AuthContext from '../../../../context/AuthContext';
import { useCities } from '../../../../hooks/useCities';
import Carousel from 'react-bootstrap/Carousel';
import apartmentdetails from './Apartment_details.module.css'
import "react-datepicker/dist/react-datepicker.css";
import emailjs from '@emailjs/browser';
import DatePickerModal from '../../../../components/Client/Apartments/datepicker_modal';
import ContactApartmentModal from '../../../../components/Client/Apartments/contact_apartment_modal';
import { useReservation } from "../../../../hooks/useReservation";
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";

export default function Apartment_details() {
    const { t } = useTranslation();
    const { user, isAuth } = useContext(AuthContext);
    const { isCorrect, useReservationApartment } = useReservation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const { useOneApartment, oneApartment } = useApartments();
    const { useOneZoneByApartment, oneZoneByApartment } = useZones();
    const { useOneCityByZone, oneCityByZone } = useCities();
    //
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    useEffect(() => {
        useOneApartment(slug);
    }, []);

    useEffect(() => {
        useOneZoneByApartment(oneApartment.zone)
    }, [oneApartment]);

    useEffect(() => {
        useOneCityByZone(oneZoneByApartment.city)
    }, [oneZoneByApartment]);

    const ManageReservation = () => {
        if (isAuth) {
            handleShow();
        }
        else {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: `${t('alerts.reserve')}`,
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    const ManageContact = () => {
        if (isAuth) {
            handleShow2();
        }
        else {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: `${t('alerts.askInfo')}`,
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    const form = useRef();
    const [submitted, setSubmitted] = useState(false);
    
    const user_name = user.username;
    const apartment_street = oneApartment.location;

    const sendEmail = (e) => {
        e.preventDefault();
            const question = e.target.question.value;
    
        const formData = {
            user_name,
            apartment_street,
            question
        };
    
        emailjs
            .send('service_qdf1c4s', 'template_15bwl2n', formData, {
                publicKey: 'BqrCx0AxXY1EKVvNx',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    
        e.target.reset();
        setSubmitted(true);
    };

    const emit_data = (dates) => {
        useReservationApartment({ f_ini: dates.formattedStart, f_end: dates.formattedEnd, apartment_id: oneApartment.id });
    }

    return (
        <>
            <br /><br /><br /><br /><br />
            <div className={apartmentdetails.ajustar}>
                <div className="row">
                    <div className={`col-md-6 ${apartmentdetails.carouselContainer}`}>
                        <Carousel>
                            {oneApartment.apartment_images && oneApartment.apartment_images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className={`d-block w-100 ${apartmentdetails.carouselImage}`}
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="col-md-6">
                        <div className={apartmentdetails.apartmentInfo}>
                            <h2>{t('apartmentDetails.title')}</h2>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>{t('apartmentDetails.location')}</th>
                                        <td>{oneApartment.location}</td>
                                    </tr>
                                    <tr>
                                        <th>{t('apartmentDetails.price')}</th>
                                        <td>{oneApartment.price}</td>
                                    </tr>
                                    <tr>
                                        <th>m² :</th>
                                        <td>{oneApartment.size}</td>
                                    </tr>
                                    <tr>
                                        <th>{t('apartmentDetails.province')}</th>
                                        <td>{oneCityByZone.state}</td>
                                    </tr>
                                    <tr>
                                        <th>{t('apartmentDetails.zone')}</th>
                                        <td>{oneZoneByApartment.name} ( {oneCityByZone.name} )</td>
                                    </tr>
                                    <tr>
                                        <th>{t('apartmentDetails.nBath')}</th>
                                        <td>{oneApartment.bathrooms}</td>
                                    </tr>
                                    <tr>
                                        <th>{t('apartmentDetails.nRoom')}</th>
                                        <td>{oneApartment.rooms}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={apartmentdetails.buttonContainer}>
                                <button className="btn btn-primary" onClick={ManageReservation}>{t('apartmentDetails.buttonR')}</button>
                                <DatePickerModal show={show} handleClose={handleClose} onAddRevervation={emit_data} />
                                <button className="btn btn-secondary" onClick={ManageContact}>{t('apartmentDetails.buttonI')}</button>
                                <ContactApartmentModal 
                                    show2={show2} 
                                    handleClose2={handleClose2} 
                                    form={form} 
                                    sendEmail={sendEmail}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}
import React,{ useEffect,useState, useRef } from 'react'
import emailjs from '@emailjs/browser';
import HomeCSS from  './Home.module.css';
import CardHomeCities from '../components/Home/card_home_cities';
import { useContext } from "react";
import CitiesContext from "../context/CitiesContext";
import ApartmentContext from "../context/ApartmentContext";
import { useNavigate } from 'react-router-dom';
import CardHomeApartments from '../components/Home/card_home_apartments';
import Map from '../components/MapHome/Map';

export default function Home() {
    const navigate = useNavigate();
    const { cities, setCities } = useContext(CitiesContext);
    const { apartments, setApartments } = useContext(ApartmentContext);

    const handleCityClick = (slug_city) => {
        navigate('/zones/' + slug_city)
    };

    const handleApartmentsClick = (slug_apartment) => {
      navigate('/apartment_details/' + slug_apartment)
    };

    const form = useRef();
    const [submitted, setSubmitted] = useState(false);
    
    const sendEmail = (e) => {
      e.preventDefault();
      
      emailjs
        .sendForm('service_qdf1c4s', 'template_1tjedvk', form.current, {
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

        form.current.reset();
        setSubmitted(true);
    };

    return (
            <div>
                <header className="w3-display-container w3-content w3-wide" style={{ maxWidth: '1500px' }} id="home">
                <img className="w3-image" src="https://www.w3schools.com/w3images/architect.jpg" alt="Architecture" width="1500" height="800" />
                <div className="w3-display-middle w3-margin-top w3-center">
                  <h1 className="w3-xxlarge w3-text-white">
                    <span className="w3-padding w3-black w3-opacity-min"><b>ABT</b></span> <span className="w3-hide-small w3-text-light-grey">AlojaBienTo</span>
                  </h1>
                </div>
              </header>
        
              <div className="w3-content w3-padding" style={{ maxWidth: '1564px' }}>

                <div className="w3-row-padding">
                  <div className="w3-container w3-padding-32" id="projects">
                      <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Nuestras Mejores Ciudades</h3>
                  </div>
                  <div className="w3-row-padding">
                  {cities.map((city, index) => (
                      <CardHomeCities key={city.id} city={city} onClick={handleCityClick} />
                  ))}
                  </div>
                </div>

                <div className="w3-container w3-padding-32" id="about">
                  <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Variedad de Lugares</h3>
                  <p>
                  Somos una empresa especializada en ofrecer una amplia gama de apartamentos en diferentes ubicaciones de España. 
                  Desde las bulliciosas calles de Barcelona hasta los encantadores pueblos costeros de Andalucía, nuestra variedad de 
                  apartamentos brinda opciones para satisfacer todas las necesidades y preferencias. 
                  Con un enfoque en la comodidad, la calidad y la accesibilidad, nos esforzamos por proporcionar a nuestros clientes 
                  experiencias únicas y memorables en cada estancia. Ya sea que estés planeando unas vacaciones familiares, 
                  un viaje de negocios o una escapada romántica, estamos aquí para ayudarte a encontrar el alojamiento 
                  perfecto para tu próxima aventura en España.
                  </p>
                </div>
                <div className="w3-row-padding">
                  {apartments.map((apartment, index) => (
                    <CardHomeApartments key={apartment.id} apartment={apartment} onClick={handleApartmentsClick} />
                  ))}
                </div>

                <div className="w3-row-padding">
                  <div className="w3-container w3-padding-32" id="projects">
                      <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Donde encontrar apartamentos</h3>
                  </div>
                  <div className="w3-row-padding">
                    <Map apartments={apartments}></Map>
                  </div>
                </div>
                <div className="w3-row-padding">
                  <div className="w3-container w3-padding-32" id="projects">
                      <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16"></h3>
                  </div>
                  <div>
                    <div className={HomeCSS.formbox}>
                    <h1>Contacta Con Nosotros</h1>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input className="form-control" id="name" type="text" name="user_name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" id="email" type="email" name="user_email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Mensaje</label>
                                <textarea className="form-control" id="message" name="message"></textarea>
                            </div>
                            <input className="btn btn-primary" type="submit" value="Enviar" />
                        </form>
                    </div>
                </div>
                </div>
              </div>
            </div>
          );
}
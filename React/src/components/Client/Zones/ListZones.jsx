import {React, useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CardZonesCSS from './CardZones.module.css';
import { useParams } from "react-router-dom";
import { useZones } from '../../../hooks/useZones';
import { useCities } from '../../../hooks/useCities';

export default function ListZones({ AllZones }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { zones } = useZones();
  const { useOneCity, citiesZones } = useCities();

  if ( slug ) {
    useEffect(function () {
      useOneCity(slug);
    }, [])
    AllZones = citiesZones
  }
  const handleZoneClick = (slug) => {
    navigate('/apartments/' + slug)
  };

  return (
    <div className={CardZonesCSS.carouselContainer}>
      <Carousel style={{ maxWidth: '1350px', margin: 'auto' }}>
        {AllZones.map((zone) => (
          <Carousel.Item 
            key={zone.id} 
            onClick={() => handleZoneClick(zone.slug)} 
            style={{ cursor: 'pointer' }}
          >
            <img
              className={`d-block w-100 ${CardZonesCSS.carouselImage}`}
              src={zone.zone_image}
              alt={zone.name}
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="text-dark">
              <h3 className={`mb-0 ${CardZonesCSS.carouselCaptionTitle}`} style={{ fontSize: '18px' }}>{zone.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
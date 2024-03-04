import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Map = ({ apartments }) => {
  const navigate = useNavigate();
 
  return (
    <MapContainer
      center={[37.3754, -5.9552]} // Coordenadas aproximadas del centro de España
      zoom={5}
      style={{
        height: "600px",
        width: "70%",
        margin: "auto",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors, <a href="https://www.openstreetmap.org/about/">OpenStreetMap</a> contributors'
        id="mapbox/streets-v11"
        accessToken="pk.eyJ1IjoiYWxiZXJ0b2dvb21lenoiLCJhIjoiY2x0NG1qNDF4MDUwdTJsbWoxd2R2dThsbyJ9.SFSq2RDeo2aqdYVEiyFlzQ"
      />
      {apartments.map((apartment) => (
        <Marker key={apartment.id} position={[apartment.lat, apartment.lon]}>
          <Popup>
            <h5>
              <b>Apartment</b>
            </h5>
            <p>
              Street: <b>{apartment.location}</b>
            </p>
            <img src={apartment.apartment_images[0]} alt="Apartment" style={{ maxWidth: "100%" }} />
            <div style={{ marginTop: "10px" }}>
              <Button onClick={() => navigate(`/apartment_details/${apartment.slug}`)}>View Details</Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
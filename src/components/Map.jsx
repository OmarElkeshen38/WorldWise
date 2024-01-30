import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCitiesContext } from "../contexts/CitiesContext";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css';
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { useGeolocation } from '../hooks/GoLocation';
import Button from './Button';

function Map() {
  
  const { cities } = useCitiesContext()
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const {isLoading: isLoadingPosition, position: geoLocationPosition, getPosition} = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(function() {
    if (mapLat && mapLng)  setMapPosition([mapLat, mapLng]);
  },[mapLat, mapLng]);

  useEffect(function() {
    if(geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
  },
  [geoLocationPosition])

  return (
    <div className={styles.mapContainer} >
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition? 'Loading...' : "Use your position"}
      </Button>
      <MapContainer 
        center={mapPosition}
        zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => 
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        )}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}


function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

ChangeCenter.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.alt}&lng=${e.latlng.lng}`),
  })
}

export default Map

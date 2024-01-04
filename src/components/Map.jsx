import { useNavigate } from 'react-router-dom';
import { useCitiesContext } from "../contexts/CitiesContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css'
import { useState } from 'react';

function Map() {
  const navigate = useNavigate();
  const { cities } = useCitiesContext()

  const [mapPosition, setMapPosition] = useState([40, 0]);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
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
      </MapContainer>
    </div>
  )
}

export default Map

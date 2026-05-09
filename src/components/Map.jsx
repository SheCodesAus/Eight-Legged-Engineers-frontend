import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map() {
  return (
        <MapContainer
        center={[-33.8688, 151.2093]}
        zoom={13}
        style={{ height: '375px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[-33.8688, 151.2093]}>
        <Popup>Sydney</Popup>
      </Marker>
    </MapContainer>
  );
}
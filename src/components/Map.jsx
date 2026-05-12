import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

export default function Map({ lat, lng }) {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        className="map-container"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup>Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
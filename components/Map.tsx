"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const ICON= icon({
    iconUrl: "https://images.vexels.com/media/users/3/131261/isolated/lists/b2e48580147ca0ed3f970f30bf8bb009-map-location-marker.png",
    iconSize: [50, 50],
    iconAnchor: [15, 15],
})

export default function Map({urn, lat, lon}:{urn: string, lat: number, lon: number}) {
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={[ lat, lon ]}
      zoom={30}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[ lat, lon ]} icon={ICON}>
        <Popup>
          ${urn} <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

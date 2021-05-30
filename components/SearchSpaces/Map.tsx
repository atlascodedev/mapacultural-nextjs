import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface ISearchSpaceMap {}

const SearchSpaceMap = ({}: ISearchSpaceMap) => {
  return (
    <MapContainer
      className="h-full w-full  rounded-lg shadow-custom"
      center={[-29.6465318, -50.7805672]}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-29.6465318, -50.7805672]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SearchSpaceMap;

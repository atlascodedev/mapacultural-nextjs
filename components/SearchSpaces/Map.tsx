import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  ICulturalSpaceSocials,
  ICulturalSpaceAddressInfo,
  ICulturalSpaceCategories,
  ICulturalSpaceModel,
  ICulturalSpacePersonalInfo,
} from "../../@types/project";

export interface ISearchSpaceMap {
  culturalSpaces: ICulturalSpaceModel[];
  action: React.Dispatch<
    React.SetStateAction<
      ICulturalSpacePersonalInfo &
        ICulturalSpaceAddressInfo &
        ICulturalSpaceCategories &
        ICulturalSpaceSocials & { open: boolean }
    >
  >;
}

const SearchSpaceMap = ({ culturalSpaces, action }: ISearchSpaceMap) => {
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
      {(
        culturalSpaces as Array<
          ICulturalSpaceModel & { lat: string; lng: string }
        >
      ).map((culturalSpace, index) => {
        return (
          <Marker
            eventHandlers={{
              click: () => action({ ...culturalSpace, open: true }),
            }}
            position={[
              parseInt(culturalSpace.lat),
              parseInt(culturalSpace.lng),
            ]}
            riseOnHover={true}
            title={culturalSpace.culturalSpaceName}
          >
            <Popup>{culturalSpace.culturalSpaceName}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default SearchSpaceMap;

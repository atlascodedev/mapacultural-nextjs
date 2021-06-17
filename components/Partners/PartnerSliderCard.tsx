import React from "react";
import { IPartnerCollection } from "../Forms/types";

export interface IPartnerSliderCard extends IPartnerCollection {}

const PartnerSliderCard = ({ partneName, partnerLogo }: IPartnerSliderCard) => {
  return (
    <div className="text-deepBlue w-56 h-36 bg-white shadow-2xl rounded flex justify-center items-center p-5">
      <img
        className="w-full h-full object-contain"
        src={partnerLogo.imageURL}
        alt={partnerLogo.imageDescription}
      />
    </div>
  );
};

export default PartnerSliderCard;

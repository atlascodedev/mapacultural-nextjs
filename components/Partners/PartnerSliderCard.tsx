import React from "react";

export interface IPartnerSliderCard {
  partnerLogo?: string;
  partnerName?: string;
  partnerURL?: string;
}

const PartnerSliderCard = ({
  partnerLogo = "https://via.placeholder.com/350",
  partnerName = "Placeholder name",
  partnerURL = "#",
}: IPartnerSliderCard) => {
  return (
    <div className="text-deepBlue w-56 h-36 bg-white shadow-2xl rounded flex justify-center items-center p-5">
      <img
        className="w-full h-full object-contain"
        src={partnerLogo}
        alt={partnerName}
      />
    </div>
  );
};

export default PartnerSliderCard;

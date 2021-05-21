import React from "react";
import SwiperCore, { Autoplay, Navigation, Lazy } from "swiper";
import PartnerSliderCard, { IPartnerSliderCard } from "./PartnerSliderCard";
import { Swiper, SwiperSlide } from "swiper/react";

export interface IPartnerSlider {
  partnersItems: IPartnerSliderCard[];
}

SwiperCore.use([Autoplay, Navigation, Lazy, Navigation]);

const PartnerSlider = ({ partnersItems }: IPartnerSlider) => {
  return (
    <Swiper
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      slidesPerView={"auto"}
      loop
      autoplay
      speed={3000}
      breakpoints={{
        1024: {
          slidesPerView: partnersItems.length >= 4 ? 4 : partnersItems.length,
          speed: 3000,
        },
      }}
    >
      {partnersItems.map((partner, index) => {
        return (
          <SwiperSlide
            style={{ display: "flex", justifyContent: "center" }}
            key={index}
          >
            <PartnerSliderCard partnerLogo={partner.partnerLogo} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default PartnerSlider;

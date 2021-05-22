import React from "react";
import SwiperCore, { Navigation, Autoplay, Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Autoplay, Pagination, Lazy]);

export interface ISearchAgentsSlider {}

const SearchAgentsSlider = ({}: ISearchAgentsSlider) => {
  return <Swiper></Swiper>;
};

export default SearchAgentsSlider;

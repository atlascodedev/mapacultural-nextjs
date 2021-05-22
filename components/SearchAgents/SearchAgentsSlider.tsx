import React from "react";
import SwiperCore, { Navigation, Autoplay, Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SearchAgentCard from "./SearchAgentCard";

SwiperCore.use([Navigation, Autoplay, Pagination, Lazy]);

export interface ISearchAgentsSlider {
  agentSliderItems: any[];
}

const SearchAgentsSlider = ({ agentSliderItems }: ISearchAgentsSlider) => {
  return (
    <Swiper
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      slidesPerView={"auto"}
      breakpoints={{
        1024: {
          slidesPerView:
            agentSliderItems.length >= 3 ? 3 : agentSliderItems.length,
        },
      }}
    >
      {agentSliderItems.map((agent, index) => {
        return (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <SearchAgentCard />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SearchAgentsSlider;

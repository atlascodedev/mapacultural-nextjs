import React from "react";
import SwiperCore, { Navigation, Autoplay, Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SearchSpaceCard from "./SearchSpaceCard";

export interface ISearchSpaceSlider {
  spaceList: any[];
}

const SearchSpaceSlider = ({ spaceList }: ISearchSpaceSlider) => {
  return (
    <Swiper
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      slidesPerView={"auto"}
      breakpoints={{
        1024: {
          slidesPerView: spaceList.length >= 3 ? 3 : spaceList.length,
        },
      }}
    >
      {spaceList.map((agent, index) => {
        return (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <SearchSpaceCard
              action={() => console.log("action")}
              actionName={"Ver agente"}
              name={"Yeah Vieira"}
              tags={["Pop", "Música", "Fotografia", "Gastronomia"]}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SearchSpaceSlider;

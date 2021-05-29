import React from "react";
import SwiperCore, { Navigation, Autoplay, Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IEventModel } from "../../@types/project";
import SearchSpaceCard from "./SearchEventCard";

export interface ISearchEventSlider {
  eventList: IEventModel[];
}

const SearchEventSlider = ({ eventList = [] }: ISearchEventSlider) => {
  return (
    <Swiper
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      slidesPerView={"auto"}
      breakpoints={{
        1024: {
          slidesPerView: eventList.length >= 3 ? 3 : eventList.length,
        },
      }}
    >
      {eventList.map((agent, index) => {
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

export default SearchEventSlider;

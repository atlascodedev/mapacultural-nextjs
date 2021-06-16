import React from "react";
import SwiperCore, { Navigation, Autoplay, Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  IEventSocialsInfo,
  IEventAddressInfo,
  IEventCategories,
  IEventModel,
  IEventPersonalInfo,
} from "../../@types/project";
import SearchEventCard from "./SearchEventCard";

export interface ISearchEventSlider {
  eventList: IEventModel[];
  action: React.Dispatch<
    React.SetStateAction<
      IEventPersonalInfo &
        IEventCategories &
        IEventAddressInfo &
        IEventSocialsInfo & {
          open: boolean;
        }
    >
  >;
}

const SearchEventSlider = ({ eventList = [], action }: ISearchEventSlider) => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      slidesPerView={"auto"}
      breakpoints={{
        1024: {
          slidesPerView: 3,
          centeredSlides: true,
          initialSlide: 1,
        },
      }}
    >
      {eventList.map((event, index) => {
        return (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <SearchEventCard
              action={() => action({ ...event, open: true })}
              actionName={"Ver evento"}
              name={event.eventName}
              tags={event.categories}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SearchEventSlider;

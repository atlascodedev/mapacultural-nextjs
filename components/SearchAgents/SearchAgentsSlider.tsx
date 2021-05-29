import React from "react";
import SwiperCore, { Navigation, Autoplay, Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IAgentModel } from "../../@types/project";
import SearchAgentCard from "./SearchAgentCard";

SwiperCore.use([Navigation, Autoplay, Pagination, Lazy]);

export interface ISearchAgentsSlider {
  agentSliderItems: IAgentModel[];
}

const SearchAgentsSlider = ({ agentSliderItems }: ISearchAgentsSlider) => {
  return (
    <Swiper
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      slidesPerView={"auto"}
      breakpoints={{
        1024: {
          slidesPerView: agentSliderItems.length >= 3 ? 3 : 1,
        },
      }}
    >
      {agentSliderItems.map((agent, index) => {
        return (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <SearchAgentCard
              action={() => console.log("action")}
              actionName={"Ver agente"}
              name={agent.fullName}
              tags={agent.categories}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SearchAgentsSlider;

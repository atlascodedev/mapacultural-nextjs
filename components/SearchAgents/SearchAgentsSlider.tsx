import React from "react";
import SwiperCore, { Navigation, Autoplay, Pagination, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  IAgentCategories,
  IAgentAddressInfo,
  IAgentModel,
  IAgentPersonalInfo,
  IAgentSocialInfo,
} from "../Forms/types";
import SearchAgentCard from "./SearchAgentCard";
import SearchAgentHorizontalCard from "./SearchAgentHorizontalCard";

SwiperCore.use([Navigation, Autoplay, Pagination, Lazy]);

export interface ISearchAgentsSlider {
  agentSliderItems: IAgentModel[];
  action: React.Dispatch<
    React.SetStateAction<
      IAgentPersonalInfo &
        IAgentAddressInfo &
        IAgentSocialInfo &
        IAgentCategories & {
          open: boolean;
        }
    >
  >;
}

const SearchAgentsSlider = ({
  agentSliderItems,
  action,
}: ISearchAgentsSlider) => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      style={{ paddingTop: "0.5rem", paddingBottom: "3rem" }}
      slidesPerView={"auto"}
      breakpoints={{
        1024: {
          slidesPerView: 3,
          centeredSlides: true,
          initialSlide: 1,
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
              action={() => action({ ...agent, open: true })}
              actionName={"Ver agente"}
              name={agent.publicName}
              tags={agent.categories}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SearchAgentsSlider;

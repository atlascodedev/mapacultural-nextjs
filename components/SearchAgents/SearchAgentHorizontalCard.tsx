import React from "react";
import UserLetter, { Sizes } from "../Utility/UserLetter";
import { FaLongArrowAltRight } from "react-icons/fa";
import TagGroup from "../Utility/TagGroup";
import { Tooltip } from "@material-ui/core";
import usePagination from "../../hooks/usePagination";

interface Props {
  title?: string;
  categories?: string[];
  action?: (...args: any[]) => void;
}

const SearchAgentHorizontalCard = ({
  title = "Museu de História da Tecnologia Harald Alberto Bauer",
  categories = ["Teste1", "Teste2", "Teste3", "Teste4", "Teste5"],
}: Props) => {
  const { activePage, pages } = usePagination(categories, 4);

  // console.log(pages, activePage);

  // console.log(activePage, pages);
  return (
    <div
      className={`md:w-[972px] w-[95%] h-[48px] group flex transition-colors`}
    >
      <div className="bg-[#F2F2F2] group-hover:bg-[#FDECD0] w-[80%] md:w-[50%] border-r-2 border-white rounded-l-full h-full flex items-center p-1">
        <div className="hidden md:block">
          <UserLetter size={Sizes.ExtraSmall} username={title} />
        </div>
        <Tooltip title={title.length <= 35 ? "" : title}>
          <div className="font-bold text-xs md:text-base flex justify-center w-full md:justify-start md:ml-5">
            {title.length <= 35 ? title : title.slice(0, 35) + "..."}
          </div>
        </Tooltip>
      </div>
      <div className="bg-[#F2F2F2] group-hover:bg-[#FDECD0] hidden md:flex pl-5  md:w-[35%] h-full">
        <TagGroup
          mobileMaxCols={2}
          truncate={categories.length - 1}
          maxCols={2}
          tags={categories}
        />
      </div>
      <div className="border-[#EC791E] bg-[#F2F2F2] group-hover:bg-secondary-main text-secondary-main w-[20%] text-secondary group-hover:text-white font-bold border-2 rounded-r-lg cursor-pointer flex justify-center items-center">
        <div className="hidden md:block">Ver perfil</div>
        <FaLongArrowAltRight className="text-3xl" />
      </div>
    </div>
  );
};

export default SearchAgentHorizontalCard;

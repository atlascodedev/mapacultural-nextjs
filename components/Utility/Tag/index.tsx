import React from "react";
import { Tooltip } from "@material-ui/core";

export interface ITag
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
}

const Tag = ({ title, ...props }: ITag) => {
  return (
    <Tooltip title={title.length > 15 ? title : ""}>
      <div
        {...props}
        style={{ width: "fit-content" }}
        className="rounded-2xl text-xs  py-0.5 px-4 text-center text-white font-black bg-tertiary-main flex justify-center items-center"
      >
        {title.length <= 15 ? title : title.slice(0, 15) + "..."}
      </div>
    </Tooltip>
  );
};

export default Tag;

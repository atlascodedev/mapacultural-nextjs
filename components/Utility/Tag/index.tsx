import React from "react";

export interface ITag
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
}

const Tag = ({ title, ...props }: ITag) => {
  return (
    <div
      {...props}
      style={{ width: "fit-content" }}
      className="rounded-2xl text-xs  py-0.5 px-4 text-white font-black bg-tertiary-main flex justify-center items-center"
    >
      {title}
    </div>
  );
};

export default Tag;

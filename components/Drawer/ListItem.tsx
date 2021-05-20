import React from "react";
import { IconType } from "react-icons";
import { MdStar } from "react-icons/md";

export interface IListItem {
  icon?: IconType | React.FC<any>;
  action: (...args: any[]) => void;
  label: string;
}

const ListItem = ({ action, icon: Icon = MdStar, label }: IListItem) => {
  return (
    <div
      onClick={action}
      className="flex w-full items-center text-deepBlue gap-5 shadow-sm p-6 cursor-pointer"
    >
      <Icon className="text-deepBlue" />
      <div>{label}</div>
    </div>
  );
};

export default ListItem;

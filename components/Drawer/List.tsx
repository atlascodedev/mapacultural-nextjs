import React from "react";
import { IListItem } from "./ListItem";

export interface IDrawerList {
  items: IListItem[];
}

const List = ({ items = [] }: IDrawerList) => {
  return <div className="w-full h-full px-20">list</div>;
};

export default List;

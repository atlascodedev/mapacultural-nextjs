import React from "react";
import ListItem, { IListItem } from "./ListItem";

export interface IDrawerList {
  items: IListItem[];
}

const List = ({ items }: IDrawerList) => {
  return (
    <div className="w-full h-full">
      {items.map((listItem, index) => {
        return (
          <ListItem
            action={listItem.action}
            icon={listItem.icon}
            label={listItem.label}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default List;

import React from "react";
import ListItem, { IListItem } from "./ListItem";

export interface IDrawerList {
  items: IListItem[];
  closeFn: (...args: any[]) => void;
}

const List = ({ items, closeFn }: IDrawerList) => {
  return (
    <div className="w-full h-full">
      {items.map((listItem, index) => {
        return (
          <ListItem
            action={() => {
              closeFn();

              setTimeout(() => {
                listItem.action();
              }, 250);
            }}
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

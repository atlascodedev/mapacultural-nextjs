import React from "react";
import { ColorThemeOptions } from "../../@types/global";

import getThemeColor from "../../helper/getThemeColor";

export interface IBurguerLine {
  burguerMenuColor?: ColorThemeOptions;
}

const MenuLine = ({ burguerMenuColor: color = "secondary" }: IBurguerLine) => {
  return (
    <div
      className={`w-full h-1 md:h-1 absolute  bg-${getThemeColor(
        color
      )} rounded`}
    ></div>
  );
};

export default MenuLine;

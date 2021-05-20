import React from "react";
import { ColorThemeOptions } from "../../@types/global";

import getThemeColor from "../../helper/getThemeColor";

export interface IBurguerLine {
  burguerMenuColor?: ColorThemeOptions;
}

const MenuLine = ({ burguerMenuColor: color = "secondary" }: IBurguerLine) => {
  return (
    <div
      className={`w-full h-1.5 md:h-2  bg-${getThemeColor(color)} rounded`}
    ></div>
  );
};

export default MenuLine;

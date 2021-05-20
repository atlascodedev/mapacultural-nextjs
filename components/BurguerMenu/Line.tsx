import React from "react";
import { ColorThemeOptions } from "../../@types/global";

import getThemeColor from "../../helper/getThemeColor";

interface MenuLineProps {
  color?: ColorThemeOptions;
}

const MenuLine = ({ color = "secondary" }: MenuLineProps) => {
  return (
    <div
      className={`w-full h-1.5 md:h-2  bg-${getThemeColor(color)} rounded`}
    ></div>
  );
};

export default MenuLine;

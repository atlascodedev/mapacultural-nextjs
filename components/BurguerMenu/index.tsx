import React from "react";

import MenuLine, { IBurguerLine } from "./Line";
import { motion } from "framer-motion";
import { ColorThemeOptions } from "../../@types/global";

export interface IBurguerMenu extends IBurguerLine {
  onMenuClick: (...args: any[]) => void;
}

const BurguerMenu = ({ burguerMenuColor, onMenuClick }: IBurguerMenu) => {
  return (
    <motion.div
      onClick={onMenuClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`md:w-12 w-11 h-auto flex flex-col gap-1.5 md:gap-2 cursor-pointer`}
    >
      <motion.div>
        <MenuLine />
      </motion.div>
      <motion.div>
        <MenuLine />
      </motion.div>
      <motion.div>
        <MenuLine />
      </motion.div>
    </motion.div>
  );
};

export default BurguerMenu;

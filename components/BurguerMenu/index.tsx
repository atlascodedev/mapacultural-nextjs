import React from "react";

import MenuLine from "./Line";
import { motion } from "framer-motion";
import { ColorThemeOptions } from "../../@types/global";

export interface BurguerMenuProps {
  color?: ColorThemeOptions;
}

const BurguerMenu = ({ color }: BurguerMenuProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`md:w-12 w-11 h-auto flex flex-col gap-1.5 md:gap-2 cursor-pointer`}
    >
      <MenuLine />
      <MenuLine />
      <MenuLine />
    </motion.div>
  );
};

export default BurguerMenu;

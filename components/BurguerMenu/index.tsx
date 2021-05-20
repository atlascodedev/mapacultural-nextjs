import React from "react";
import { ColorThemeOptions } from "../../@types";
import MenuLine from "./Line";
import { motion } from "framer-motion";

export interface BurguerMenuProps {
  color?: ColorThemeOptions;
}

const BurguerMenu = ({ color }: BurguerMenuProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`w-11 h-auto flex flex-col gap-2 cursor-pointer`}
    >
      <MenuLine />
      <MenuLine />
      <MenuLine />
    </motion.div>
  );
};

export default BurguerMenu;

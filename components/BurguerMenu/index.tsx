import React from "react";

import MenuLine, { IBurguerLine } from "./Line";
import { motion } from "framer-motion";
import { ColorThemeOptions } from "../../@types/global";

export interface IBurguerMenu extends IBurguerLine {
  onMenuClick: (...args: any[]) => void;
  active: boolean;
}

const BurguerMenu = ({
  burguerMenuColor,
  onMenuClick,
  active,
}: IBurguerMenu) => {
  return (
    <div
      onClick={onMenuClick}
      className={`md:w-16 md:h-16 w-14 h-14  cursor-pointer bg-white rounded-full shadow-md relative flex justify-center items-center`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`md:w-9 w-9 h-auto justify-center  flex flex-col  relative`}
      >
        <motion.div
          className="relative"
          animate={active ? "open" : "closed"}
          variants={{
            open: { rotate: -45, y: 0 },
            closed: { rotate: 0, y: -9 },
          }}
        >
          <MenuLine />
        </motion.div>
        <motion.div
          className="relative"
          variants={{
            open: {
              opacity: 0,
              y: [0, 0, -100],
            },
            closed: { x: 0, opacity: 1, y: 0 },
          }}
          animate={active ? "open" : "closed"}
        >
          <MenuLine />
        </motion.div>
        <motion.div
          className="relative"
          animate={active ? "open" : "closed"}
          variants={{
            open: { rotate: 45, x: 3, y: 0 },
            closed: { rotate: 0, y: 9 },
          }}
        >
          <MenuLine />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BurguerMenu;

import React from "react";
import { IconType } from "react-icons";
import { AiFillInfoCircle } from "react-icons/ai";
import { motion } from "framer-motion";

export interface ISwitchViewButton {
  children?: React.ReactNode;
  icon?: IconType;
  action?: (...args: any[]) => void;
  active?: boolean;
}

const SwitchViewButton = ({
  action,
  children = "Ver em lista",
  icon: Icon = AiFillInfoCircle,
  active,
}: ISwitchViewButton) => {
  return (
    <motion.button
      variants={{
        tap: { scale: 0.9 },
        hover: { scale: 1.1 },
      }}
      whileTap="tap"
      whileHover="hover"
      className={`${
        active ? "text-white bg-secondary-main" : "text-gray-800 bg-white"
      } transition-colors hover:text-white hover:bg-secondary-main focus:outline-none border-secondary-main border-2 md:px-5 px-4 py-0.5 font-bold md:text-md text-sm rounded-md`}
      onClick={action}
    >
      <div className="flex items-center gap-x-4">
        <Icon className="md:text-lg text-base" />
        <div>{children}</div>
      </div>
    </motion.button>
  );
};

export default SwitchViewButton;

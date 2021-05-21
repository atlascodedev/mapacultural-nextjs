import { motion } from "framer-motion";
import React from "react";
import { ColorThemeOptions } from "../../@types/global";
import getThemeColor from "../../helper/getThemeColor";

export interface IFormButton {
  themeColor?: ColorThemeOptions;
}

const SubmitButton: React.FC<
  IFormButton & React.HTMLAttributes<HTMLDivElement>
> = ({ children, themeColor = "secondary", onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`bg-${getThemeColor(
        themeColor
      )} rounded-lg p-3 cursor-pointer text-white font-bold flex justify-center items-center`}
    >
      {children}
    </motion.div>
  );
};

export default SubmitButton;

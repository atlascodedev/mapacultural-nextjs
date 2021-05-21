import { motion } from "framer-motion";
import React from "react";
import {
  ColorThemeOptions,
  ColorThemeOptionsVariants,
} from "../../@types/global";
import getThemeColor from "../../helper/getThemeColor";

export interface IFormButton {
  themeColor?: ColorThemeOptions;
  colorVariant?: ColorThemeOptionsVariants;
}

const SubmitButton: React.FC<
  IFormButton & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  themeColor = "secondary",
  onClick,
  disabled,
  colorVariant,
}) => {
  return (
    <motion.button
      disabled={Boolean(disabled)}
      onClick={disabled ? null : onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
      bg-${disabled ? "gray-200" : getThemeColor(themeColor, colorVariant)} 
      rounded-lg p-3 cursor-pointer  text-white font-bold flex justify-center items-center transition-colors`}
    >
      {children}
    </motion.button>
  );
};

export default SubmitButton;

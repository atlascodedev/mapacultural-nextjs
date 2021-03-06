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
  ...props
}) => {
  return (
    <motion.button
      disabled={Boolean(disabled)}
      onClick={disabled ? null : onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
      ${
        disabled
          ? "bg-gray-200"
          : "bg-" + getThemeColor(themeColor, colorVariant).toString()
      }
      rounded-lg p-3 cursor-pointer  text-white font-bold flex justify-center items-center transition-colors ${
        props.className
      }`}
    >
      {children}
    </motion.button>
  );
};

export default SubmitButton;

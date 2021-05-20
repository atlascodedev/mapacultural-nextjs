import React from "react";
import { motion, MotionConfigContext } from "framer-motion";

export interface SocialButtonProps {}

const SocialButton: React.FC<SocialButtonProps> = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-11 h-11 flex justify-center items-center
    bg-white
    overflow-hidden
    shadow-md
    rounded-full
    cursor-pointer
    "
    >
      {children}
    </motion.div>
  );
};

export default SocialButton;

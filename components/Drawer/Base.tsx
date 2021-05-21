import { motion } from "framer-motion";
import React from "react";

export interface IDrawerBase {}

const Base: React.FC<IDrawerBase> = ({ children }) => {
  return (
    <motion.div
      transition={{ type: "just" }}
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      exit={{ x: -400 }}
      className="h-screen w-60 md:w-80 fixed left-0 top-0 bg-white shadow-lg"
    >
      {children}
    </motion.div>
  );
};

export default Base;

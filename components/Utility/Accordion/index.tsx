import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { motion } from "framer-motion";

export interface IAtlasAccordion {
  fullWidth?: boolean;
  shadow?: boolean;
  label: string;
}

const AtlasAccordion: React.FC<IAtlasAccordion> = ({
  children,
  fullWidth,
  label,
  shadow,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div
      className={`m-auto overflow-hidden ${
        fullWidth ? "w-full" : "w-1/2"
      } flex flex-col ${shadow ? "shadow-md" : "shadow-none"}`}
    >
      <div className="w-full bg-gray-100 rounded-t-md items-center py-2 px-5  flex">
        <div className="text-gray-700 font-bold capitalize flex-grow">
          {label}
        </div>
        <motion.div
          className="cursor-pointer"
          onClick={() => setOpen((prevState) => !prevState)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          initial={"open"}
          animate={open ? "open" : "closed"}
          variants={{
            open: {
              rotate: 180,
            },
            closed: {
              rotate: 0,
            },
          }}
        >
          <RiArrowDownSLine className="text-3xl" />
        </motion.div>
      </div>
      <motion.div
        initial={"open"}
        animate={open ? "open" : "closed"}
        variants={{
          open: {
            height: "auto",
          },
          closed: {
            height: "0px",
          },
        }}
        className={`px-5`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AtlasAccordion;

import { motion } from "framer-motion";
import React from "react";

interface ITabItem {
  label: string;
  component: JSX.Element;
}

export interface ITabs {
  tabItems: ITabItem[] | any;
}

const TabLabel: React.FC<any> = ({ children, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      className="text-deepBlue text-lg p-2 pb-1 flex justify-center outline-none focus:outline-none border-tertiary-main border-b-4 font-bold cursor-pointer items-center"
    >
      {children}
    </motion.button>
  );
};

const Tabs = ({ tabItems }: ITabs) => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-full md:w-1/2  rounded-xl flex justify-center gap-10 p-10">
        {tabItems.map((tabItem, index) => {
          return (
            <TabLabel onClick={() => setActiveTab(index)}>
              Item + {index}
            </TabLabel>
          );
        })}
      </div>

      <div>
        {tabItems.map((tabItem, index: number) => {
          return index === activeTab ? <div>hello + {index}</div> : null;
        })}
      </div>
    </div>
  );
};

export default Tabs;

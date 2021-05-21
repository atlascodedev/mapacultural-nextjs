import { motion } from "framer-motion";
import React from "react";

interface ITabItem {
  label: string;
  component: JSX.Element;
}

export interface ITabs {
  tabItems: ITabItem[] | any;
}

const TabLabel: React.FC<React.HTMLAttributes<any> & { active: boolean }> = ({
  children,
  onClick,
  active,
}) => {
  return (
    <div className="group">
      <button
        onClick={onClick}
        className="text-deepBlue text-lg p-2 itemsc flex justify-center  outline-none  transition-colors rounded-lg focus:outline-none  font-bold cursor-pointer items-center"
      >
        {children}
      </button>
      <div
        className={`group-hover:w-full ${
          active ? "w-full" : "w-0"
        }  h-1  transition-all duration-500 bg-deepBlue rounded-xl`}
      ></div>
    </div>
  );
};

const Tabs = ({ tabItems }: ITabs) => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-full md:w-1/2  rounded-xl flex justify-center gap-10 p-10">
        {tabItems.map((tabItem, index) => {
          return (
            <TabLabel
              active={index === activeTab}
              key={index}
              onClick={() => setActiveTab(index)}
            >
              Item + {index}
            </TabLabel>
          );
        })}
      </div>

      <div>
        {tabItems.map((tabItem, index: number) => {
          return index === activeTab ? (
            <div key={index}>hello + {index}</div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Tabs;

import { motion } from "framer-motion";
import React from "react";
import AtlasTabPanel from "./TabPanel";

interface ITabItem {
  label: string;
  component: JSX.Element;
}

export interface ITabs {
  tabItems: ITabItem[];
  fullWidth?: boolean;
}

const AtlasTab = ({ tabItems, fullWidth }: ITabs) => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <div
          className={`w-full ${
            fullWidth ? "md:w-full" : "md:w-1/2"
          } rounded-xl flex justify-center gap-2 md:gap-10 py-2 px-2`}
        >
          {tabItems.map((tabItem, index) => {
            return (
              <AtlasTabPanel
                active={index === activeTab}
                key={index}
                onClick={() => setActiveTab(index)}
              >
                {tabItem.label}
              </AtlasTabPanel>
            );
          })}
        </div>
      </div>

      {tabItems.map((tabItem, index: number) => {
        return index === activeTab ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            key={index}
          >
            {tabItem.component}
          </motion.div>
        ) : null;
      })}
    </div>
  );
};

export default AtlasTab;

import React from "react";

export interface ITabPanel {
  active: boolean;
}

const AtlasTabPanel: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & ITabPanel
> = ({ children, onClick, active }) => {
  return (
    <div className="group">
      <button
        onClick={onClick}
        className="text-deepBlue text-sm md:text-lg p-2 itemsc flex justify-center  outline-none  transition-colors rounded-lg focus:outline-none  font-bold cursor-pointer items-center"
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
export default AtlasTabPanel;

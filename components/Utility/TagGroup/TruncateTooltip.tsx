import { Tooltip } from "@material-ui/core";
import React from "react";

export interface ITruncateTooltip {
  truncated: string[];
}

const TruncateTooltip = ({ truncated }: ITruncateTooltip) => {
  return (
    <div
      style={{ width: "fit-content" }}
      className="bg-tertiary-dark cursor-pointer rounded-full relative flex justify-center items-center shadow-custom px-2 py-0.5 "
    >
      <div>
        <Tooltip
          title={
            <div className="flex flex-col gap-1">
              {truncated.map((value, index) => {
                return (
                  <div key={index} className="capitalize">
                    {value}
                  </div>
                );
              })}
            </div>
          }
        >
          <div className="text-white flex font-black text-xs">
            + {truncated.length}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default TruncateTooltip;

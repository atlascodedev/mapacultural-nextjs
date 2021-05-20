import React from "react";
import { Breakpoints } from "../../@types/global";
import getBreakpoint from "../../helper/getBreakpoint";

const useViewportDetect = (options?: { attachEventListener: boolean }) => {
  const [viewPort, setViewport] = React.useState<Breakpoints>(null);

  React.useEffect(() => {
    setViewport(getBreakpoint());
  }, []);

  React.useEffect(() => {
    if (options && options.attachEventListener) {
      const updateState = () => {
        setViewport(getBreakpoint());
      };

      global.window.addEventListener("resize", updateState);

      return () => window.removeEventListener("resize", updateState);
    }
  }, []);

  return viewPort;
};

export default useViewportDetect;

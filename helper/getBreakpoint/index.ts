import { Breakpoints } from "../../@types/global";

const getBreakpoint = (): Breakpoints => {
  let windowWidth = global.window.innerWidth;

  if (windowWidth >= 1536) {
    return "2xl";
  } else if (windowWidth >= 1280) {
    return "xl";
  } else if (windowWidth >= 1024) {
    return "lg";
  } else if (windowWidth >= 768) {
    return "md";
  } else {
    return "sm";
  }
};

export default getBreakpoint;

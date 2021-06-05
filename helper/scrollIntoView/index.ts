import React from "react";
import scrollPolyfill from "../scrollIntoViewPolyfill";
import converToSlug from "../convertToSlug";

// const isChrome: boolean = global.window.navigator.userAgent.includes("Chrome");

// const smoothScrollSupport: boolean =
//   "scrollBehavior" in global.window.document.documentElement.style;

const scrollIntoView = (
  menuName: string,
  callback?: ((...args: any[]) => void) | any
) => {
  if (global.window.location.pathname !== "/") {
    global.window.location.href = "/";
    return;
  }

  scrollPolyfill(`#${converToSlug(menuName).toLowerCase()}`);

  if (callback) {
    callback();
  }
};

export default scrollIntoView;

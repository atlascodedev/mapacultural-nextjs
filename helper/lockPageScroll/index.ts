const lockPageScroll = (locked: boolean): void => {
  if (locked) {
    global.window.document.documentElement.style.overflowY = "hidden";
  } else {
    global.window.document.documentElement.style.overflow = "initial";
  }
};

export default lockPageScroll;

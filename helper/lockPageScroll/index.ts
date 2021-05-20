const lockPageScroll = (locked: boolean): void => {
  if (locked) {
    global.window.document.body.style.overflow = "hidden";
  } else {
    global.window.document.body.style.overflow = "initial";
  }
};

export default lockPageScroll;

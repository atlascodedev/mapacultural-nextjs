const lockPageScroll = (locked: boolean): void => {
  if (locked) {
    global.window.document.body.style.overflowY = "scroll";
    global.window.document.body.style.position = "fixed"
    global.window.document.body.style.width = '100%'
  } else {
    global.window.document.body.style.overflowY = "initial";
    global.window.document.body.style.position = "initial"
    global.window.document.body.style.position = '100%'
  }
};

export default lockPageScroll;

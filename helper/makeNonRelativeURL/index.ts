const makeNonRelativeURL = (URL: string) => {
  if (!URL.startsWith("http")) {
    return "//" + URL;
  } else {
    return URL;
  }
};

export default makeNonRelativeURL;

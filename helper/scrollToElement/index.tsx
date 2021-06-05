import { ScrollElement, scroller } from "react-scroll";

const scrollHelper = (name: string) => {
  scroller.scrollTo(name, {
    duration: 500,
    delay: 100,
    smooth: true,
    offset: -100,
  });
};

export default scrollHelper;

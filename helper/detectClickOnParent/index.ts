const detectClickOnParent = (
  event: React.MouseEvent<HTMLElement>,
  ref: React.RefObject<HTMLDivElement>,
  callback: (...args: any[]) => void
) => {
  if (event.target === ref.current) {
    callback();
  }
};

export default detectClickOnParent;

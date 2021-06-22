const range = (start: number, end: number) => {
  const length = end - start;
  return Array.from({ length }, (undefined, i) => start + i);
};

export default range;

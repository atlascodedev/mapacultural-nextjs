function generateMockData<T>(shape: T, amount: number) {
  let outArray: T[] = [];

  for (let i = 0; i < amount; i++) {
    outArray.push(shape);
  }

  return outArray;
}

export default generateMockData;

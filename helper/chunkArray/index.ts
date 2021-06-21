export function createSubArrays<R>(
  subArrayLength: number,
  data: Array<R>
): Array<R[]> {
  let outArray = [];

  while (data.length) {
    outArray.push(data.splice(0, subArrayLength));
  }

  return outArray;
}

export function createChunk<R>(chunkLength: number, data: Array<R>) {
  let arrayCopy = [...data];
  let outArray = [];

  while (arrayCopy.length) {
    let arrayInternal = [];

    for (let i = 0; i < chunkLength; i++) {
      if (!arrayCopy.length) {
        break;
      }

      arrayInternal.push(arrayCopy.shift());
    }

    outArray.push(arrayInternal);
  }

  return outArray;
}

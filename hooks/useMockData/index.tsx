import React from "react";

function useMockData<T>(shape: T, amount: number): T[] {
  const [data, setData] = React.useState<T[]>([]);

  React.useEffect(() => {
    const tempArray: Array<T> = [];

    for (let i = 0; i < amount; i++) {
      tempArray.push(shape);
    }

    setData(tempArray);
  }, []);

  return data;
}

export default useMockData;

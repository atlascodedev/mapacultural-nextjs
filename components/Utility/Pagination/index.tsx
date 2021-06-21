import React from "react";
import PaginationButton from "./PaginationButton";

interface IAtlasPagination {
  data: any[];
  action: (...args: any[]) => void;
  truncateAt?: number;
}

function AtlasPagination({ data, action, truncateAt = 3 }: IAtlasPagination) {
  const [active, setActive] = React.useState<number>(0);

  return (
    <div className="flex gap-5">
      {data.map((value, index) => {
        return (
          <PaginationButton
            key={index}
            active={active === index}
            action={() => {
              action(index);
              setActive(index);
            }}
            label={(index + 1).toString()}
          />
        );
      })}
    </div>
  );
}

export default AtlasPagination;

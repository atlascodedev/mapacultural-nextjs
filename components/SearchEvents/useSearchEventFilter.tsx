import { isWithinInterval } from "date-fns/esm";
import React from "react";
import { IEventModel } from "../Forms/types";

export const getMonthLong = (dateString: string) => {
  const longMonth = new Date(dateString).toLocaleString("pt-br", {
    month: "long",
  });

  return longMonth;
};

export const filterEvents = (
  month: string,
  category: string,
  events: IEventModel[],
  callback: (...args: any[]) => void
) => {
  if (category === "Todos") {
    callback([...events]);
  } else if (category.length <= 0 && month.length > 0) {
    let eventInternal: IEventModel[] = events.filter((event, index) => {
      return (
        getMonthLong(event.startingDate).toUpperCase() === month.toUpperCase()
      );
    });

    console.log(eventInternal);
    callback(eventInternal);
  } else if (category.length > 0 && month.length <= 0) {
    let eventInternal: IEventModel[] = events.filter((event, index) => {
      return event.categories.includes(category as any);
    });
    console.log(eventInternal);
    callback(eventInternal);
  } else if (category.length > 0 && month.length > 0) {
    let eventInternal: IEventModel[] = events.filter((event, index) => {
      return (
        event.categories.includes(category as any) &&
        getMonthLong(event.startingDate).toUpperCase() === month.toUpperCase()
      );
    });
    console.log(eventInternal);
    callback(eventInternal);
  } else {
    console.log("nothing matches");
  }
};

const useSearchEventFilter = () => {
  const [active, setActive] = React.useState<IEventModel[]>([]);
  const [month, setMonth] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("Todos");
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    if (category == "Todos" && active.length <= 0) {
      setMessage("Nenhum evento foi encontrado");
    } else if (category === "Todos" && month.length <= 0) {
      setMessage(`Mostrando todos eventos`);
    } else if (category === "Todos" && month.length > 0) {
      setMessage(`Mostrando todos os eventos no mês de ${month.toLowerCase()}`);
    } else if (active.length > 0 && month.length <= 0) {
      setMessage(
        `${
          active.length
        } eventos foram encontrados na categoria ${category.toLowerCase()}`
      );
    } else if (active.length > 0 && month.length > 0) {
      setMessage(`
        ${
          active.length
        } eventos foram encontrados na categoria ${category.toLowerCase()} no mês de ${month.toLowerCase()}
      `);
    } else if (active.length <= 0 && category.length > 0 && month.length > 0) {
      setMessage(`
        Nenhum evento foi encontrado na categoria ${category.toLowerCase()} no mês de ${month.toLowerCase()}
      `);
    } else {
      setMessage("Nenhum evento foi encontrado");
    }
  }, [active]);

  return {
    active,
    month,
    category,
    message,
    setActive,
    setMonth,
    setCategory,
  };
};

export default useSearchEventFilter;

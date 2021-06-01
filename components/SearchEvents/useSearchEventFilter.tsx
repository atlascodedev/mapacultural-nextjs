import React from "react";
import { IEventModel } from "../../@types/project";
import Fuse from "fuse.js";
import { useEffectExceptOnMount } from "../../hooks/useEffectExcepOnMount";

export const getMonthLong = (dateString: string) => {
  const longMonth = new Date(dateString).toLocaleString("pt-br", {
    month: "long",
  });

  return longMonth;
};

export const filterEvents = (
  name: string,
  month: string,
  category: string,
  events: IEventModel[],
  callback: (...args: any[]) => void
) => {
  if (category === "Todos") {
    callback(events);
    return;
  }

  if (category.length > 0 && name.length <= 0 && month.length <= 0) {
    let eventInternal: IEventModel[] = events.filter((event, index) => {
      return event.categories.includes(category as any);
    });

    callback(eventInternal);
    return;
  }

  if (category.length > 0 && month.length > 0 && name.length <= 0) {
    let eventInternal: IEventModel[] = events.filter((event, index) => {
      return (
        event.categories.includes(category as any) &&
        getMonthLong(event.startingDate).toUpperCase() === month.toUpperCase()
      );
    });
    callback(eventInternal);
    return;
  }

  if (category.length > 0 && month.length > 0 && name.length > 0) {
    let eventInternal: IEventModel[] = events.filter((event, index) => {
      return (
        event.categories.includes(category as any) &&
        getMonthLong(event.startingDate).toUpperCase() === month.toUpperCase()
      );
    });

    const fuzzySearch = new Fuse(eventInternal, { keys: ["eventName"] });

    const fuzzyResult = fuzzySearch.search(name).map((value, index) => {
      return value.item;
    });

    callback(fuzzyResult);
    return;
  }

  if (name.length > 0 && month.length <= 0 && category.length <= 0) {
    const fuzzySearch = new Fuse(events, { keys: ["eventName"] });

    const fuzzyResult = fuzzySearch.search(name).map((value, index) => {
      return value.item;
    });

    callback(fuzzyResult);
    return;
  }

  if (name.length > 0 && month.length > 0 && category.length <= 0) {
    const fuzzySearch = new Fuse(events, { keys: ["eventName"] });

    const fuzzyResult = fuzzySearch.search(name).filter((value, index) => {
      return (
        getMonthLong(value.item.startingDate).toUpperCase() ===
        month.toUpperCase()
      );
    });

    callback(fuzzyResult);
    return;
  }
};

const useSearchEventFilter = () => {
  const [active, setActive] = React.useState<IEventModel[]>([]);
  const [name, setName] = React.useState<string>("");
  const [month, setMonth] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("Todos");
  const [message, setMessage] = React.useState<string>(
    "Use os filtros para começar"
  );

  useEffectExceptOnMount(() => {
    if (category === "" && name === "") {
      let message = "Use os filtros para começar";
      setMessage(message);
    }

    if (active.length === 0 && category === "Todos") {
      let message = "Nenhum evento foi encontrado.";
      setMessage(message);
    }

    if (active.length === 0 && category !== "Todos") {
      let message = `Nenhum evento foi encontrado na categoria ${category.toLowerCase()}`;
      setMessage(message);
    }

    if (active.length > 0 && category !== "Todos") {
      let message = `${
        active.length
      } foi encontrado na categoria ${category.toLowerCase()}`;
      setMessage(message);
    }
  }, [active]);

  return {
    active,
    name,
    month,
    category,
    message,
    setActive,
    setName,
    setMonth,
    setCategory,
  };
};

export default useSearchEventFilter;

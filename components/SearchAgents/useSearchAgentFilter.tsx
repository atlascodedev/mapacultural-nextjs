import React from "react";
import Fuse from "fuse.js";
import { useEffectExceptOnMount } from "../../hooks/useEffectExcepOnMount";
import { IAgentModel } from "../Forms/types";

export const filterAgents = (
  name: string,
  agents: IAgentModel[],
  category: string,
  callback: (...args: any[]) => void
) => {
  let agentInternal: IAgentModel[] = [];
  let agentResult: IAgentModel[] = [];

  if (category === "Todos") {
    callback(agents);
    return;
  } else if (name === "" && category) {
    let noNameResult = agents.filter((value, index) => {
      return value.categories.includes(category as any);
    });

    callback(noNameResult);
    return;
  }

  agents.forEach((agent, index) => {
    agent.categories.forEach((categoryInner, index) => {
      if (categoryInner === category) {
        agentInternal.push(agent);
      }
    });
  });

  const fuzzy = new Fuse(agentInternal, { keys: ["fullName"] });

  const result = fuzzy.search(name);

  result.forEach((value, index) => {
    agentResult.push(value.item);
  });

  callback(agentResult);
};

const useSearchAgentFilter = () => {
  const [category, setCategory] = React.useState<string>("Todos");
  const [name, setName] = React.useState<string>("");
  const [active, setActive] = React.useState<IAgentModel[]>([]);
  const [message, setMessage] = React.useState<string>(
    "Use os filtros para começar."
  );

  useEffectExceptOnMount(() => {
    if (category === "" && name === "") {
      let message = "Use os filtros para começar";
      setMessage(message);
    }

    if (active.length === 0) {
      let message = `Nenhum agente foi encontrado na categoria ${category.toLowerCase()}`;

      setMessage(message);
    } else if (category == "Todos") {
      let message = `Mostrando todos os ${active.length} agente(s) culturais`;

      setMessage(message);
    } else {
      let message = `${
        active.length
      } agente(s) foram encontrados na categoria ${category.toLowerCase()}`;

      setMessage(message);
    }
  }, [active]);

  return { category, name, active, message, setCategory, setName, setActive };
};

export default useSearchAgentFilter;

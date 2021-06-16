import { EventType } from "../../types";

const isEventPhysical = (eventTypeOption: EventType): boolean => {
  return eventTypeOption === "Físico" || eventTypeOption === "Híbrido";
};

export default isEventPhysical;

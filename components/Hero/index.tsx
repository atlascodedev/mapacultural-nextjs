import React from "react";
import { FaRegCalendar, FaUsers } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import CTAButton from "./CTAButton";
import style from "./Hero.module.css";

export interface IHero {
  actionAgents: (...args: any[]) => void;
  actionSpaces: (...args: any[]) => void;
  actionsEvents: (...args: any[]) => void;
}

const Hero = ({ actionAgents, actionSpaces, actionsEvents }: IHero) => {
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="w-full h-full relative flex justify-center ">
        <img
          className="h-full overflow-hidden absolute w-full mt-4"
          src="images/map-vector.svg"
          alt="Ilustração do contorno do mapa de Taquara, Rio Grande do Sul."
        />
        <div className="md:mt-36 md:px-40 z-50 mt-20 relative">
          <div className="font-bold flex flex-col items-center text-center   md:text-4xl z-50 text-2xl ">
            <span className="mb-3 ">Faça parte do Mapeamento</span>
            <span> Cultural de Taquara.</span>
          </div>
          <div className="flex justify-center gap-5 md:gap-8 2xl:gap-10 2xl:mt-16 mt-5 flex-col items-center">
            <CTAButton
              action={actionAgents}
              icon={FaUsers}
              label="Agente cultural"
            />
            <CTAButton
              action={actionSpaces}
              icon={AiFillBank}
              label="Espaço cultural"
            />
            <CTAButton
              action={actionsEvents}
              icon={FaRegCalendar}
              label="Eventos"
            />
          </div>

          <div className={`w-28 h-32 absolute ${style.mapFigureOne}`}>
            <img
              src="images/map-person-1.svg"
              alt="Pessoa sorrindo (ilustração)"
            />
          </div>

          <div className={`w-28 h-32 absolute ${style.mapFigureTwo}`}>
            <img
              src="images/map-person-2.svg"
              alt="Pessoa sorrindo (ilustração)"
            />
          </div>
          <div className={`w-28 h-32 absolute ${style.mapFigureThree}`}>
            <img
              src="images/map-person-3.svg"
              alt="Pessoa sorrindo (ilustração)"
            />
          </div>
          <div className={`w-28 h-32 absolute ${style.mapFigureFour}`}>
            <img
              src="images/map-person-4.svg"
              alt="Pessoa sorrindo (ilustração)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";

interface IAboutUs {}

const AboutUs = ({}: IAboutUs) => {
  return (
    <div className={"p-10 w-full h-auto  flex flex-col md:flex-row"}>
      <div className="md:w-1/2 md:px-12 h-auto flex flex-col justify-center text-left md:text-right ">
        <h2 className="font-extrabold text-lg md:leading-normal md:text-4xl ">
          Apoie o Mapeamento Cultural de Taquara
        </h2>

        <p className="font-normal md:text-2xl md:leading-relaxed">
          A comunidade cultural precisa ser reconhecida e estruturada para
          fortalecer cada vez mais o cenário da cidade de Taquara.
        </p>
      </div>

      <div className="md:w-1/2 h-auto flex">
        <img
          src="images/about-us-illustration.svg"
          alt="Duas pessoas felizes pulando olhando para a esquerda (ilustração)"
        />
      </div>
    </div>
  );
};

export default AboutUs;

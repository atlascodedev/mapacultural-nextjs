import React from "react";
import ContactForm from "./Form";

export interface ContactProps {}

const Contact = (props: ContactProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 md:flex md:justify-center">
        <ContactForm submitFn={async () => console.log("nothing for now")} />
      </div>

      <div className="md:w-1/2 items-center flex flex-col p-8 md:p-0 w-full">
        <img
          className="w-auto h-auto object-contain"
          src="images/contact-illustration.svg"
          alt="Ilustração de duas pessoas pulando felizes"
        />
        <div className="text-tertiary-dark md:text-3xl text-2xl block w-full mt-4 md:w-1/2 leading-relaxed  ">
          Precisa de ajuda? Então fale conosco.
        </div>
      </div>
    </div>
  );
};

export default Contact;

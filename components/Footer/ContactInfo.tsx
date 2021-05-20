import React from "react";

export interface ContactInfoProps {
  contactNumber: string;
  contactEmail: string;
}

const ContactInfo = ({ contactEmail, contactNumber }: ContactInfoProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row gap-5 md:gap-10 text-center md:text-left flex-grow w-full justify-center`}
    >
      <div className="flex flex-col">
        <div className="font-bold ">Fale conosco</div>
        <div className="font-serif">{contactNumber}</div>
      </div>

      <div className="flex flex-col">
        <div className="font-bold">Contato por e-mail</div>
        <div className="font-serif ">{contactEmail}</div>
      </div>
    </div>
  );
};

export default ContactInfo;

import React from "react";
import FooterBase, { FooterBaseProps } from "./Base";
import ContactInfo, { ContactInfoProps } from "./ContactInfo";
import Socials, { FooterSocialsProps } from "./Socials";

export interface FooterProps
  extends FooterBaseProps,
    ContactInfoProps,
    FooterSocialsProps {}

const Footer = ({
  contactEmail,
  contactNumber,
  facebook,
  instagram,
  whatsapp,
}: FooterProps) => {
  return (
    <FooterBase>
      <ContactInfo contactEmail={contactEmail} contactNumber={contactNumber} />

      <Socials facebook={facebook} instagram={instagram} whatsapp={whatsapp} />

      <div className="text-center text-white font-serif">
        {`© ${new Date().getFullYear()} - Todos Direitos Reservados - Atlas Code - Desenvolvimento web & estratégia`}
      </div>
    </FooterBase>
  );
};

export default Footer;

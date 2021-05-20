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
      <div className="w-full flex flex-col md:flex-row gap-10">
        <ContactInfo
          contactEmail={contactEmail}
          contactNumber={contactNumber}
        />

        <Socials
          facebook={facebook}
          instagram={instagram}
          whatsapp={whatsapp}
        />
      </div>

      <div className="text-center text-white font-serif">
        {`© ${new Date().getFullYear()} - Todos Direitos Reservados - Atlas Code - Desenvolvimento web & estratégia`}
      </div>
    </FooterBase>
  );
};

export default Footer;

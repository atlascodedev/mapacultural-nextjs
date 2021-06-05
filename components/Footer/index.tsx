import React from "react";
import FooterBase, { FooterBaseProps } from "./Base";
import ContactInfo, { ContactInfoProps } from "./ContactInfo";
import Socials, { FooterSocialsProps } from "./Socials";
import Link from "next/link";

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

      <div className="text-center text-white font-serif grid grid-cols-1 grid-flow-row md:grid-cols-2 ">
        <div className="flex items-center">
          {`© ${new Date().getFullYear()} - Todos Direitos Reservados - Atlas Code - Desenvolvimento web & estratégia`}
        </div>

        <div className="flex flex-col gap-5 mt-10 md:mt-0 ">
          <Link href="/politica-privacidade">
            <a className="outline-none text-white font-black justify-center flex md:justify-end">
              Política de privacidade
            </a>
          </Link>

          <Link href="/termos-de-uso">
            <a className="outline-none text-white font-black justify-center flex md:justify-end">
              Termos de uso
            </a>
          </Link>
        </div>
      </div>
    </FooterBase>
  );
};

export default Footer;

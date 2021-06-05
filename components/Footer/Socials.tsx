import React from "react";
import SocialButton from "./SocialButton";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
export interface FooterSocialsProps {
  whatsapp: string;
  facebook: string;
  instagram: string;
}

const Socials = ({ facebook, instagram, whatsapp }: FooterSocialsProps) => {
  return (
    <div className={`flex w-full justify-center gap-8`}>
      <a target="_blank" href={facebook}>
        <SocialButton>
          <FaFacebookF className="text-deepBlue text-2xl" />
        </SocialButton>
      </a>

      <a target="_blank" href={instagram}>
        <SocialButton>
          <FaInstagram className="text-deepBlue text-2xl" />
        </SocialButton>
      </a>

      <a target="_blank" href={whatsapp}>
        <SocialButton>
          <FaWhatsapp className="text-deepBlue text-2xl" />
        </SocialButton>
      </a>
    </div>
  );
};

export default Socials;

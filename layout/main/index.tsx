import Head from "next/head";
import React from "react";
import Footer, { FooterProps } from "../../components/Footer";
import Navbar, { INavbar } from "../../components/Navbar";
import WhatsAppButton from "../../components/Utility/WhatsAppButton";

interface MainLayoutProps extends INavbar, FooterProps {
  title: string;
  metaDescription: string;
  MenuComponent: JSX.Element;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  metaDescription,
  title,
  navbarColor: color,
  MenuComponent,
  externalPath,
  contactEmail,
  contactNumber,
  facebook,
  instagram,
  whatsapp,
  onMenuClick,
  burguerMenuColor,
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        onMenuClick={onMenuClick}
        burguerMenuColor={burguerMenuColor}
        navbarColor={color}
      />
      {MenuComponent}
      <WhatsAppButton />

      <main>{children}</main>
      <Footer
        facebook={facebook}
        instagram={instagram}
        whatsapp={whatsapp}
        contactEmail={contactEmail}
        contactNumber={contactNumber}
      />
    </React.Fragment>
  );
};

export default MainLayout;

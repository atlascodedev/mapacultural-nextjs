import Head from "next/head";
import React from "react";
import Footer, { FooterProps } from "../../components/Footer";
import Navbar, { NavbarProps } from "../../components/Navbar";
import WhatsAppButton from "../../components/Utility/WhatsAppButton";

interface MainLayoutProps extends NavbarProps, FooterProps {
  title: string;
  metaDescription: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  metaDescription,
  title,
  color,
  externalPath,
  contactEmail,
  contactNumber,
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar color={color} />
      <WhatsAppButton />

      <main>{children}</main>
      <Footer contactEmail={contactEmail} contactNumber={contactNumber} />
    </React.Fragment>
  );
};

export default MainLayout;

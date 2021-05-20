import Head from "next/head";
import React from "react";
import Footer from "../../components/Footer";
import Navbar, { NavbarProps } from "../../components/Navbar";
import WhatsAppButton from "../../components/Utility/WhatsAppButton";

interface MainLayoutProps extends NavbarProps {
  title: string;
  metaDescription: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  metaDescription,
  title,
  color,
  externalPath,
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar color={color} />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </React.Fragment>
  );
};

export default MainLayout;

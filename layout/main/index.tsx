import Head from "next/head";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import WhatsAppButton from "../../components/Utility/WhatsAppButton";

interface Props {
  title: string;
  metaDescription: string;
}

const MainLayout: React.FC<Props> = ({ children, metaDescription, title }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </React.Fragment>
  );
};

export default MainLayout;

import Head from "next/head";
import React from "react";
import Drawer from "../components/Drawer";
import MainLayout from "../layout/main";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout
        active={drawerOpen}
        onMenuClick={() => toggleDrawer(true)}
        MenuComponent={
          <Drawer
            closeFn={() => toggleDrawer(false)}
            open={drawerOpen}
            items={[
              {
                action: () => console.log("action"),
                label: "Label lorem ipsum",
              },
            ]}
          />
        }
        facebook="#"
        instagram="#"
        whatsapp="#"
        contactEmail="atendimento@mapaculturaltaquara.com.br"
        contactNumber="(51)98910-5138"
        navbarColor="primary"
        metaDescription="Mapa cultural de Taquara"
        title="Mapa Cultural"
      >
        <div className="h-screen"></div>
      </MainLayout>
    </div>
  );
}

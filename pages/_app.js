import "../styles/globals.css";
require("swiper/swiper.min.css");
require("swiper/components/navigation/navigation.min.css");
require("swiper/components/pagination/pagination.min.css");
require("swiper/components/scrollbar/scrollbar.min.css");
require("swiper/components/effect-fade/effect-fade.min.css");
require("swiper/components/scrollbar/scrollbar.min.css");
require("swiper/components/lazy/lazy.min.css");
import GlobalUIProvider from "../context/global_ui/provider";
import MainLayout from "../layout/main";
import Drawer from "../components/Drawer";
import scrollIntoView from "../helper/scrollIntoView";
import React from "react";
import scrollHelper from "../helper/scrollToElement";

function MyApp({ Component, pageProps }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };
  return (
    <div>
      <MainLayout
        active={drawerOpen}
        onMenuClick={() => toggleDrawer(true)}
        MenuComponent={
          <Drawer
            closeFn={() => toggleDrawer(false)}
            open={drawerOpen}
            items={[
              {
                action: () => scrollHelper("hero"),
                label: "Home",
              },
              {
                action: () => scrollHelper("filter"),
                label: "Buscar informações",
              },
              {
                action: () => scrollHelper("partners"),
                label: "Parceiros",
              },
              {
                action: () => scrollHelper("contact"),
                label: "Contato",
              },
            ]}
          />
        }
        facebook="https://www.facebook.com/institutoprocidadania/"
        instagram="https://www.instagram.com/institutogauchoprocidadania/"
        whatsapp="https://wa.link/y6edo4"
        contactEmail="contato@pro-cidadania.org"
        contactNumber="+55 (51) 9-8910-5138"
        navbarColor="primary"
        metaDescription="Mapa cultural de Taquara"
        title="Mapeamento Cultural de Taquara"
      >
        <GlobalUIProvider>
          <Component {...pageProps} />
        </GlobalUIProvider>
      </MainLayout>
    </div>
  );
}

export default MyApp;

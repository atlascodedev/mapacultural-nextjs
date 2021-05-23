import { TextField } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import Drawer from "../components/Drawer";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Search from "../components/Search";
import SearchAgents from "../components/SearchAgents";
import SearchSpaces from "../components/SearchSpaces";
import AtlasAccordion from "../components/Utility/Accordion";
import FormPageContainer from "../components/Utility/FormPageContainer";
import MainLayout from "../layout/main";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const [eventFormActive, setEventFormActive] = React.useState<boolean>(false);
  const [spacesFormActive, setSpacesFormActive] =
    React.useState<boolean>(false);
  const [agentFormActive, setAgentFormActive] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => {
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
        <AnimatePresence>
          {!eventFormActive && !spacesFormActive && !agentFormActive && (
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Hero
                actionAgents={() => setAgentFormActive(true)}
                actionSpaces={() => setSpacesFormActive(true)}
                actionsEvents={() => setEventFormActive(true)}
              />
              <AboutUs />
              <Search
                tabItems={[
                  {
                    component: <SearchAgents agentsList={[1, 1, 1, 1, 1]} />,
                    label: "Agentes culturais",
                  },
                  {
                    component: (
                      <div className="flex justify-center w-full p-10">
                        Removido temporariamente
                      </div>
                    ),
                    label: "Espaços culturais",
                  },
                  { component: <SearchSpaces />, label: "Eventos/Projetos" },
                ]}
              />
              <Partners
                partnersItems={[
                  { partnerLogo: "https://via.placeholder.com/350" },
                  { partnerLogo: "https://via.placeholder.com/350" },
                  { partnerLogo: "https://via.placeholder.com/350" },
                  { partnerLogo: "https://via.placeholder.com/350" },
                  { partnerLogo: "https://via.placeholder.com/350" },
                ]}
              />
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
        {eventFormActive && !spacesFormActive && !agentFormActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1>Eventos</h1>
            <button onClick={() => setEventFormActive(false)}>go back</button>
          </motion.div>
        )}
        <AnimatePresence>
          {!eventFormActive && spacesFormActive && !agentFormActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>Espaços culturais</div>
              <button onClick={() => setSpacesFormActive(false)}>
                go back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!eventFormActive && !spacesFormActive && agentFormActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FormPageContainer
                headerLabel={"Agente cultural"}
                headerHelpertext={
                  "Faça seu cadastro e participe do Mapeamento Cultural de Taquara"
                }
                actionCancelFn={() => setAgentFormActive(false)}
                actionSubmitFn={() => console.log("action submit fn")}
              >
                <AtlasAccordion shadow fullWidth label="Etapa 1">
                  <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row md:gap-28 py-5 md:px-16">
                    <TextField label="Pessoa física" />
                    <TextField label="E-mail de cadastro" />
                  </div>
                </AtlasAccordion>
              </FormPageContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </MainLayout>
    </div>
  );
}

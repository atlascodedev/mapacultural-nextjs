import { TextField } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import AboutUs from "../components/AboutUs";
import AgentForm from "../components/AgentForm";
import Contact from "../components/Contact";
import Drawer from "../components/Drawer";
import EventsForm from "../components/EventsForm";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Search from "../components/Search";
import SearchAgents from "../components/SearchAgents";
import SearchSpaces from "../components/SearchSpaces";
import SpacesForm from "../components/SpacesForm";
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
            <EventsForm headerReturnAction={() => setEventFormActive(false)} />
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
              <SpacesForm
                headerReturnAction={() => setSpacesFormActive(false)}
              />
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
              <AgentForm headerReturnAction={() => setAgentFormActive(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </MainLayout>
    </div>
  );
}

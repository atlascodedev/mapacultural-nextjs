import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import AboutUs from "../components/AboutUs";
import AgentForm from "../components/Forms/AgentForm";
import Contact from "../components/Contact";
import Drawer from "../components/Drawer";
import EventsForm from "../components/Forms/EventsForm";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Search from "../components/Search";
import SearchAgents from "../components/SearchAgents";
import SearchEvents, { ISearchEvents } from "../components/SearchEvents";
import SpacesForm from "../components/Forms/SpacesForm";
import MainLayout from "../layout/main";
import SearchSpaces from "../components/SearchSpaces";
import { GetStaticProps } from "next";
import { AxiosResponse } from "axios";
import {
  IAgentModel,
  ICulturalSpaceModel,
  IEventModel,
} from "../@types/project";
import { API } from "../constants";
import scrollIntoView from "../helper/scrollIntoView";
import useGlobalUI from "../context/global_ui/hook";
import FeedbackDialog from "../components/Utility/FeedbackDialog";
import LinearProgress from "../components/Utility/LinearProgress";

interface IHomeProps {
  events: IEventModel[];
  culturalSpaces: ICulturalSpaceModel[];
  agents: IAgentModel[];
}

export default function Home({ agents, culturalSpaces, events }: IHomeProps) {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const [eventFormActive, setEventFormActive] = React.useState<boolean>(false);
  const [spacesFormActive, setSpacesFormActive] =
    React.useState<boolean>(false);
  const [agentFormActive, setAgentFormActive] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  console.log(agents, culturalSpaces, events);

  const homeRef = React.useRef(null);
  const filterRef = React.useRef(null);
  const partnerRef = React.useRef(null);
  const contactRef = React.useRef(null);

  const { dispatch, state } = useGlobalUI();

  console.log(state);
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
                action: () => scrollIntoView("home", homeRef),
                label: "Home",
              },
              {
                action: () => scrollIntoView("filter", filterRef),
                label: "Buscar informações",
              },
              {
                action: () => scrollIntoView("partners", partnerRef),
                label: "Parceiros",
              },
              {
                action: () => scrollIntoView("contact", contactRef),
                label: "Contato",
              },
            ]}
          />
        }
        facebook="#"
        instagram="#"
        whatsapp="#"
        contactEmail="contato@pro-cidadania.org"
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
              <div id="hero">
                <Hero
                  actionAgents={() => setAgentFormActive(true)}
                  actionSpaces={() => setSpacesFormActive(true)}
                  actionsEvents={() => setEventFormActive(true)}
                />
              </div>
              <AboutUs />
              <div id="filter">
                <Search
                  tabItems={[
                    {
                      component: <SearchAgents agentsList={agents} />,
                      label: "Agentes culturais",
                    },
                    {
                      component: (
                        <SearchSpaces culturalSpaces={culturalSpaces} />
                      ),
                      label: "Espaços culturais",
                    },
                    {
                      component: <SearchEvents eventList={events} />,
                      label: "Eventos/Projetos",
                    },
                  ]}
                />
              </div>
              <div id="partners">
                <Partners
                  partnersItems={[
                    { partnerLogo: "https://via.placeholder.com/350" },
                    { partnerLogo: "https://via.placeholder.com/350" },
                    { partnerLogo: "https://via.placeholder.com/350" },
                    { partnerLogo: "https://via.placeholder.com/350" },
                    { partnerLogo: "https://via.placeholder.com/350" },
                  ]}
                />
              </div>

              <div id="contact">
                <Contact />
              </div>
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
            <EventsForm
              headerReturnAction={() => {
                global.window.scrollTo(0, 0);
                setEventFormActive(false);
              }}
            />
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
                headerReturnAction={() => {
                  global.window.scrollTo(0, 0);
                  setSpacesFormActive(false);
                }}
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
              <AgentForm
                headerReturnAction={() => {
                  global.window.scrollTo(0, 0);
                  setAgentFormActive(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <FeedbackDialog
          severity={state.feedbackSeverity}
          message={state.feedbackMessage}
          title={state.feedbackTitle}
          closeFn={() => dispatch({ type: "SET_FEEDBACK_DIALOG_HIDDEN" })}
          open={state.feedbackOpen}
        />
        <LinearProgress visible={state.isLoading} />
      </MainLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const agentRequest: AxiosResponse<IAgentModel[]> = await API.get("/agents");
  const spaceRequest: AxiosResponse<ICulturalSpaceModel[]> = await API.get(
    "/spaces"
  );
  const eventRequest: AxiosResponse<IEventModel[]> = await API.get("/events");

  const agentData: IAgentModel[] = agentRequest.data;
  const spaceData: ICulturalSpaceModel[] = spaceRequest.data;
  const eventData: IEventModel[] = eventRequest.data;

  return {
    props: {
      agents: agentData,
      culturalSpaces: spaceData,
      events: eventData,
    },
  };
};

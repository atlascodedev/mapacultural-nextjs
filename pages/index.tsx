import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import AboutUs from "../components/AboutUs";
import AgentForm from "../components/Forms/AgentForm";
import Contact from "../components/Contact";
import EventsForm from "../components/Forms/EventsForm";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Search from "../components/Search";
import SearchAgents from "../components/SearchAgents";
import SearchEvents from "../components/SearchEvents";
import SpacesForm from "../components/Forms/SpacesForm";
import SearchSpaces from "../components/SearchSpaces";
import { GetStaticProps } from "next";
import { AxiosResponse } from "axios";
import { API } from "../constants";
import useGlobalUI from "../context/global_ui/hook";
import FeedbackDialog from "../components/Utility/FeedbackDialog";
import LinearProgress from "../components/Utility/LinearProgress";
import { Element } from "react-scroll";
import {
  IAgentModel,
  ICulturalSpaceModel,
  IEventModel,
  IPartnerCollection,
} from "../components/Forms/types";
import generateMockData from "../helper/generateMockData";

interface IHomeProps {
  events: IEventModel[];
  culturalSpaces: ICulturalSpaceModel[];
  agents: IAgentModel[];
  partners: IPartnerCollection[];
}

const mockAgent: IAgentModel = {
  birthday_or_founding: "",
  categories: [
    "Artes visuais",
    "Artesanato",
    "Cultura viva",
    "Produção cultural",
  ],
  cep: "90550070",
  cpf_or_cnpj: "0109323232",
  description: "Description lorem ipsum text",
  fullName: "Placeholder Fullname Test",
  gender: "Homem",
  neighborhood: "Centro",
  phoneNumber: "512321321",
  professionalRecord: "Alo",
  publicEmail: "teste@teste.com",
  publicName: "Public name 1",
  race: "Amarela",
  registrationEmail: "123",
  street: "1231",
  streetNumber: "123",
  complement: "Placeholder ",
  facebook: "https://facebook.com/placeholder",
  instagram: "https://instagram.com/placeholder",
  portfolio: "https://portfoliolink.com/placeholder",
  publicPhoneNumber: "51984773704",
  website: "https://placeholder.com",
};

const mockEvent: IEventModel = {
  categories: ["Artes visuais", "Folclore", "Memória e patrimônio"],
  description: "Lorem ipsum description",
  endingDate: new Date(Date.now()).toJSON(),
  eventAgeRestriction: "18",
  eventEntryType: "Acesso gratuito",
  eventFrequency: "Anual",
  eventHead: "Head",
  eventName: "Event name",
  eventType: "Físico",
  privateEmail: "teste@teste.com",
  privatePhone: "5198423232",
  startingDate: new Date(Date.now()).toJSON(),
  workingHours: "working hours",
  cep: "9040405",
  complement: "",
  eventFee: "Free",
  eventURL: "https://eventurl.com",
  neighborhood: "Centro",
  publicEmail: "teste@testepublic.com",
  publicPhone: "512302323",
  street: "12323",
  streetNumber: "1231312",
  website: "https://website.com",
};

const mockSpace: ICulturalSpaceModel & { lat: string; lng: string } = {
  accessibilityType: ["Banheiros adaptados", "Bebedouro adaptado"],
  accessible: "yeah",
  category: ["Artes visuais", "Audiovisual", "Outros", "Memória e patrimônio"],
  cep: "905570",
  cpf_or_cpnj: "010423232",
  culturalSpaceCapacity: "50",
  culturalSpaceEntry: "Espaço privado",
  culturalSpaceHead: "Space Head",
  culturalSpaceName: "Name space",
  culturalSpaceSphere: "Associação",
  description: "Description here",
  entryTypes: "Acesso gratuito",
  neighborhood: "Centro",
  publicEmail: "teste@teste.com",
  privateEmail: "teste@testepublic.com",
  privatePhone: "123123141",
  street: "23232",
  streetNumber: "13232134",
  workingHours: "9 as 20",
  complement: "complement",
  entryFee: "Free",
  facebook: "https://facebook.com/placeholder",
  instagram: "https://instagram.com/placeholder",
  publicPhone: "51298858242",
  publicPhoneAlt: "51974242232",
  website: "https://website.com",
  lat: "-29.648026733832797",
  lng: "-50.776309989784494",
};

export default function Home({
  agents,
  culturalSpaces,
  events,
  partners,
}: IHomeProps) {
  const [eventFormActive, setEventFormActive] = React.useState<boolean>(false);
  const [spacesFormActive, setSpacesFormActive] =
    React.useState<boolean>(false);
  const [agentFormActive, setAgentFormActive] = React.useState<boolean>(false);

  const { dispatch, state } = useGlobalUI();

  return (
    <div>
      <AnimatePresence>
        {!eventFormActive && !spacesFormActive && !agentFormActive && (
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Element name="hero">
              <Hero
                actionAgents={() => setAgentFormActive(true)}
                actionSpaces={() => setSpacesFormActive(true)}
                actionsEvents={() => setEventFormActive(true)}
              />
            </Element>
            <AboutUs />
            <Element name="filter">
              <Search
                tabItems={[
                  {
                    component: (
                      <SearchAgents
                        agentsList={
                          process.env.NODE_ENV !== "production"
                            ? [...generateMockData(mockAgent, 47)]
                            : agents
                        }
                      />
                    ),
                    label: "Agentes culturais",
                  },
                  {
                    component: (
                      <SearchSpaces
                        culturalSpaces={
                          process.env.NODE_ENV !== "production"
                            ? [...generateMockData(mockSpace, 29)]
                            : culturalSpaces
                        }
                      />
                    ),
                    label: "Espaços culturais",
                  },
                  {
                    component: (
                      <SearchEvents
                        eventList={
                          process.env.NODE_ENV !== "production"
                            ? [...generateMockData(mockEvent, 93)]
                            : events
                        }
                      />
                    ),
                    label: "Eventos/Projetos",
                  },
                ]}
              />
            </Element>
            {partners.length > 0 ? (
              <Element name="partners">
                <Partners partnersItems={partners} />
              </Element>
            ) : null}

            <Element name="contact">
              <Contact />
            </Element>
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
    </div>
  );
}

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const agentRequest: AxiosResponse<IAgentModel[]> = await API.get("/agents");
  const spaceRequest: AxiosResponse<ICulturalSpaceModel[]> = await API.get(
    "/spaces"
  );
  const eventRequest: AxiosResponse<IEventModel[]> = await API.get("/events");
  const partnersRequest: AxiosResponse<IPartnerCollection[]> = await API.get(
    "/collections/entries/partners"
  );

  const agentData: IAgentModel[] = agentRequest.data;
  const spaceData: ICulturalSpaceModel[] = spaceRequest.data;
  const eventData: IEventModel[] = eventRequest.data;
  const partnerData: IPartnerCollection[] = partnersRequest.data;

  return {
    props: {
      agents: agentData,
      culturalSpaces: spaceData,
      events: eventData,
      partners: partnerData,
    },
  };
};

import axios from "axios";
import React from "react";
import { EMAIL_ENDPOINT } from "../../constants";
import useGlobalUI from "../../context/global_ui/hook";
import ContactForm from "./Form";

export interface ContactProps {}

const Contact = (props: ContactProps) => {
  const { dispatch, state } = useGlobalUI();

  const submitContactForm = (data: any) => {
    dispatch({ type: "SET_GLOBAL_LOADING_TRUE" });

    return axios
      .post(EMAIL_ENDPOINT, data)
      .then(() => {
        dispatch({ type: "SET_GLOBAL_LOADING_FALSE" });

        dispatch({
          type: "SET_FEEDBACK_DIALOG_VISIBLE",
          payload: {
            feedbackMessage:
              "Seu contato foi enviado com sucesso. Em breve retornaremos através do e-mail fornecido neste formulário.",
            feedbackSeverity: "success",
            feedbackTitle: "Formulário enviado com sucesso",
          },
        });
      })
      .catch((error) => {
        dispatch({ type: "SET_GLOBAL_LOADING_FALSE" });

        dispatch({
          type: "SET_FEEDBACK_DIALOG_VISIBLE",
          payload: {
            feedbackMessage:
              "Houve um erro ao tentar enviar enviar a mensagem do seu formulário. Por favor, recarregue a página e tente novamente. Pedimos desculpas pela inconveniência.",
            feedbackSeverity: "error",
            feedbackTitle: "Erro ao enviar formulário.",
          },
        });
      });
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center bg-gray-50 md:mt-10 md:py-10">
      <div className="md:w-1/2 md:flex md:justify-center">
        <ContactForm submitFn={submitContactForm} />
      </div>

      <div className="md:w-1/2 items-center flex flex-col p-8 md:p-0 w-full">
        <img
          className="w-auto h-auto object-contain"
          src="images/contact-illustration.svg"
          alt="Ilustração de duas pessoas pulando felizes"
        />
        <div className="text-tertiary-dark md:text-3xl text-2xl block w-full mt-4 md:w-1/2 leading-relaxed  ">
          Precisa de ajuda? Então fale conosco.
        </div>
      </div>
    </div>
  );
};

export default Contact;

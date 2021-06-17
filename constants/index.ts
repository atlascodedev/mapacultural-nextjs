import axios from "axios";

const axiosBaseURL: string =
  process.env.NODE_ENV !== "production"
    ? "http://127.0.0.1:5001/mapeamento-cultural/us-central1/api"
    : "https://us-central1-mapeamento-cultural.cloudfunctions.net/api";

export const API = axios.create({ ...axios.defaults, baseURL: axiosBaseURL });

export const EMAIL_ENDPOINT =
  "https://us-central1-atlascodedev-landing.cloudfunctions.net/api/sendMail/mapacultural";

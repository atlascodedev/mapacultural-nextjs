import "../styles/globals.css";
require("swiper/swiper.min.css");
require("swiper/components/navigation/navigation.min.css");
require("swiper/components/pagination/pagination.min.css");
require("swiper/components/scrollbar/scrollbar.min.css");
require("swiper/components/effect-fade/effect-fade.min.css");
require("swiper/components/scrollbar/scrollbar.min.css");
require("swiper/components/lazy/lazy.min.css");
import GlobalUIProvider from "../context/global_ui/provider";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalUIProvider>
      <Component {...pageProps} />;
    </GlobalUIProvider>
  );
}

export default MyApp;

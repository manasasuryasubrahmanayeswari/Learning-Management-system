import { useEffect } from "react";
import { AppProps } from "next/app";
import { loadRazorpay } from "../app/utils/loadRazorpay"; // Adjust the path accordingly

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadRazorpay("https://checkout.razorpay.com/v1/checkout.js").then((loaded) => {
      if (!loaded) {
        console.error("Razorpay SDK failed to load");
      }
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;


import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Layout from "../Components/Layout";
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {

    if (typeof document !== 'undefined') {
      //@ts-ignore
      import('bootstrap/dist/js/bootstrap.min.js');
      //@ts-ignore
      import('bootstrap/dist/js/bootstrap.js');
    }
  }, []);
  return (
    <Provider store={store}>
      <Layout>

        <Component {...pageProps} />
      </Layout>
    </Provider>)
}

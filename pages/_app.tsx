import type { AppProps } from "next/app";
import { MultiWalletProvider } from "../components/MultiWalletProvider";
import "../styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MultiWalletProvider>
      <Component {...pageProps} />
    </MultiWalletProvider>
  );
}

export default MyApp;

import React from "react";
import type { Network } from "@thirdweb-dev/sdk/solana";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider as ThirdwebProviderSolana } from "@thirdweb-dev/react/solana";
import { ThirdwebProvider as ThirdwebProviderEvm } from "@thirdweb-dev/react";

interface MultiWalletProviderProps {
  children: React.ReactNode;
}
export const MultiWalletContext = React.createContext({});
type supportedChains = 1 | 137; // evm mainnet
function MultiWalletProvider({ children }: MultiWalletProviderProps) {
  const [chainId, setChainId] = React.useState<supportedChains>(1);
  const [nonEvmChain, setNonEvmChain] = React.useState<Network>("mainnet-beta");

  return (
    <MultiWalletContext.Provider
      value={{ chainId, setChainId, nonEvmChain, setNonEvmChain }}
    >
      <ThirdwebProviderEvm desiredChainId={chainId}>
        <ThirdwebProviderSolana network={nonEvmChain}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </ThirdwebProviderSolana>
      </ThirdwebProviderEvm>
    </MultiWalletContext.Provider>
  );
}

const useMultiWallet = () => {
  return React.useContext(MultiWalletContext);
};

export { MultiWalletProvider, useMultiWallet };

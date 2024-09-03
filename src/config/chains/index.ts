import { mainnet, sepolia } from "viem/chains";
import { urqlEndpoint } from "../env";

const chains = [
  {
    definition: mainnet,
    subgraphUrl: urqlEndpoint.mainnet,
  },
  {
    definition: sepolia,
    subgraphUrl: urqlEndpoint.sepolia,
  },
] as const;

export { chains };

import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { config } from "@/lib/config";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(config.rpc_url_base_sepolia),
  },
});

import { Clusters } from "@clustersxyz/sdk"
import { Cluster, Wallet } from "@clustersxyz/sdk/types";
import { ReactNode, createContext } from "react";

type ClustersContextType = {
  clusters: undefined | {
    apiKey: string | undefined,
    getName: (address: string) => Promise<string | null>,
    getNames: (addresses: string[]) => Promise<{
        address: string,
        name: string,
    }[]>,
    getAddress: (name: string) => Promise<Wallet | null>,
    getAddresses: (names: string[]) => Promise<Wallet[]>,
    getCluster: (clusterName: string) => Promise<Cluster | null>,
    getClusters: (clusterNames: string[]) => Promise<Cluster[]>,
}
}

export const ClustersContext = createContext<ClustersContextType>({
  clusters: undefined
})

export default function ClustersProvider({children}:{children:ReactNode}) {
  const clusters = new Clusters();
  return <ClustersContext.Provider value={{clusters}}>{children}</ClustersContext.Provider>
}
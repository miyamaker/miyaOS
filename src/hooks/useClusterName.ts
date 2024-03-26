import { ClustersContext } from "@/context/ClustersProvider";
import { Cluster } from "@clustersxyz/sdk/types";
import cluster from "cluster";
import { useContext, useState, useEffect } from "react";
import { Address } from "viem";

export function useClusterName(address?: Address) {
  const { clusters } = useContext(ClustersContext);
  const [clusterName, setClusterName] = useState<string>('');
  useEffect(() => {
    if(!clusters || !address) return
    clusters.getName(address).then((name: string|null) => {
      setClusterName(name || "");
    });
  }, [address,clusters]);
  return clusterName;
}
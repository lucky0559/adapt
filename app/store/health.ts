import { getHealth, getPulseHealthCheck } from "@/actions/healthCheck/actions";
import { create } from "zustand";

type HealthStoreType = {
  dbMgrHealth: boolean | null;
  pulseHealth: boolean | null;
  setHealth: () => Promise<void>;
};

export const useHealthStore = create<HealthStoreType>(set => ({
  dbMgrHealth: null,
  pulseHealth: null,
  setHealth: async () => {
    const dbMgrHealth = await getHealth();
    const pulseHealth = await getPulseHealthCheck();
    set({ dbMgrHealth, pulseHealth });
  }
}));

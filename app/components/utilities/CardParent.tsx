"use client";

import { getPulseRestart, getRestart } from "@/actions/restart/actions";
import { Card } from "@/components/utilities/Card";
import { useHealthStore } from "@/store/health";
import React, { useCallback, useEffect } from "react";

export const CardParent = () => {
  const { dbMgrHealth, pulseHealth, setHealth } = useHealthStore(
    state => state
  );

  const dbMgrRestart = useCallback(async () => {
    await getRestart();
  }, []);

  const pulseRestart = useCallback(async () => {
    await getPulseRestart();
  }, []);

  const toExactMinute = 60000 - (new Date().getTime() % 60000);

  useEffect(() => {
    setHealth();
    const interval = setInterval(() => {
      setHealth();
    }, toExactMinute);
    return () => clearInterval(interval);
  }, []);

  return (
    <tbody>
      <Card
        serviceName="np-db-mgr"
        restartFunction={dbMgrRestart}
        isHealthy={dbMgrHealth}
      />
      <Card
        serviceName="pulse-api"
        restartFunction={pulseRestart}
        isHealthy={pulseHealth}
      />
    </tbody>
  );
};

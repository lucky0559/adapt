"use server";

import { baseUrl } from "@/lib";

async function getHealth() {
  try {
    const res = await fetch(`${baseUrl}/health`);
    const data = await res.json();
    return data.status;
  } catch (error) {}
}

async function getPulseHealthCheck() {
  try {
    const res = await fetch(`${baseUrl}/pulse-health`);
    const data = await res.json();
    return data.status;
  } catch (error) {}
}

export { getHealth, getPulseHealthCheck };

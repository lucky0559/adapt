"use server";

import { baseUrl } from "@/lib";

async function getPulseRestart() {
  try {
    const res = await fetch(`${baseUrl}/pulse-restart`);
    const data = await res.json();
    return data.result;
  } catch (error) {}
}

async function getRestart() {
  try {
    const res = await fetch(`${baseUrl}/restart`);
    const data = await res.json();
    return data.result;
  } catch (error) {}
}

export { getPulseRestart, getRestart };

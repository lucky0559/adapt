"use server";

import { createSession, deleteSession } from "@/lib/session";
import { z } from "zod";
import { baseUrl, fetchPost } from "@/lib";
import { UserOptionRole } from "@/types";

async function getUser(id: string, password: string) {
  try {
    const payload = {
      username: id,
      password
    };
    const res = await fetchPost(`${baseUrl}/user`, payload);
    return res;
  } catch (error) {}
}

async function getUserList() {
  try {
    const res = await fetch(`${baseUrl}/userList`);
    const data = await res.json();
    return data;
  } catch (error) {}
}

async function postUser(payload: UserOptionRole) {
  try {
    const res = await fetchPost(`${baseUrl}/userInsert`, payload);
    return res;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
}

const loginSchema = z.object({
  userId: z.string().min(4, { message: "ID must be at least 4 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .trim()
});

async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  console.log(result.data);
  if (!result.success) {
    console.log(result.error);
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  const { userId, password } = result.data;

  const res = await getUser(userId.toString(), password);
  if ("exception" in res) {
    return {
      error: "NO ACCESS, INVALID USER, NO RECORD"
    };
  }

  const user = userId.toString();
  const users = await getUserList();
  const isUserExist = users?.find((data: any) => data.user === user);
  if (!isUserExist) {
    const userPayload = { user };
    await postUser(userPayload);
  }

  await createSession(res.username);
}

async function logout() {
  await deleteSession();
  return { message: "Logged out successfully" };
}

export { logout, getUserList, postUser, login };

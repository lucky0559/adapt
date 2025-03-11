import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
import { getUserList } from "@/actions/user/actions";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    path: "/",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  duration: 24 * 60 * 60 * 1000
};

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

type RolePayload = {
  role: string;
};

const { cookies } = await import("next/headers");

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function encryptRole(payload: RolePayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"]
    });
    return payload;
  } catch (e) {}
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expiresAt });

  // const user = users.find(user => user.id === userId);
  const users = await getUserList();
  const user = users.find((user:any) => user.user === userId);
  console.log("ROLE: ", user);

  const userRole = await encryptRole({ role: user?.role ?? "" });

  (await cookies())
    .set(cookie.name, session, {
      ...cookie.options
    })
    .set("role", userRole, {
      ...cookie.options
    });
  redirect("/dashboard");
}

export async function verifySession() {
  const c = (await cookies()).get(cookie.name)?.value;
  const session = await decrypt(c);
  if (!session?.userId) {
    redirect("/");
  }
  return { userId: session.userId };
}

export async function verifyRole() {
  const c = (await cookies()).get("role")?.value;
  const session = await decrypt(c);
  if (session?.role === "admin") {
    return true;
  }
  return false;
}

export async function deleteSession() {
  (await cookies()).delete(cookie.name).delete("role");
  redirect("/");
}

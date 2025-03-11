type User = {
  user: string;
  role: string;
};

type UserOptionRole = Omit<User, "role"> & { role?: string };

export type { User, UserOptionRole };

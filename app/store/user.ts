import { getUserList, postUser } from "@/actions/user/actions";
import { User } from "@/types";
import { create } from "zustand";

type UserStoreType = {
  userList: User[];
  getUserList: () => Promise<void>;
  postUser: (i: User) => Promise<void>;
};

export const useUserStore = create<UserStoreType>(set => ({
  userList: [],
  getUserList: async () => {
    const res = await getUserList();
    set({
      userList: res
    });
  },
  postUser: async i => {
    await postUser(i);
  }
}));

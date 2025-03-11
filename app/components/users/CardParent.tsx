"use client";

import { Card } from "@/components/users/Card";
import { useUserStore } from "@/store";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const CardParent = () => {
  const { userList, getUserList } = useUserStore(useShallow(state => state));

  useEffect(() => {
    (async () => {
      await getUserList();
    })();
  }, []);

  return (
    <>
      {userList?.map(user => (
        <Card key={user.user} user={user.user} role={user.role} />
      ))}
    </>
  );
};

export default CardParent;

"use client";

import { User, Shield, ChevronDown } from "lucide-react";
import { useUserStore } from "@/store";
import { useState } from "react";

interface UserCardProps {
  user: string;
  role: string;
}

export const Card: React.FC<UserCardProps> = ({ user, role }) => {
  const [currentRole, setCurrentRole] = useState<string>(role);
  const postUser = useUserStore(state => state.postUser);

  const handleRoleChange = async (newRole: string) => {
    const userPayload = { user, role: newRole };
    try {
      await postUser(userPayload);
      setCurrentRole(newRole);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <tr className="border-b text-center">
      <td className="py-2 px-4 flex items-center justify-center">
        <User className="mr-2 text-blue-500" />
        {user}
      </td>
      <td className="py-2 px-4">
        <div className="relative inline-block w-full">
          <select
            value={currentRole}
            onChange={e => handleRoleChange(e.target.value)}
            className="appearance-none w-full p-2 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </td>
      <td className="py-2 px-4 flex items-center justify-center">
        <Shield
          className={`mr-2 ${
            currentRole === "admin" ? "text-green-500" : "text-gray-500"
          }`}
        />
      </td>
    </tr>
  );
};

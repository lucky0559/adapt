import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui";
import { CardParent } from "@/components/users";

const UsersContent = lazy(async () => {
  const columns = ["User", "Role", "Actions"];
  return {
    default: () => (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-6">User Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {columns.map(i => (
                  <th key={i} className="py-2 px-4 border-b text-center">
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <CardParent />
            </tbody>
          </table>
        </div>
      </div>
    )
  };
});

export default function Users() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full mb-4" />
          ))}
        </div>
      }
    >
      <UsersContent />
    </Suspense>
  );
}

import { Skeleton } from "../ui";
export default function Spinner() {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
}
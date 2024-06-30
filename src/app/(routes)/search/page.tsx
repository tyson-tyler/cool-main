import { Suspense } from "react";

import SearchPageContent from "@/components/Tension";
import { Loader } from "lucide-react";
import Input from "@/components/Input";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen justify-center flex items-center">
          <div className="flex justify-center items-center">
            <Loader className="w-10 h-10 animate-spin" />
          </div>
        </div>
      }
    >
      <div className="mt-16">
        <Input />
      </div>
      <SearchPageContent />
    </Suspense>
  );
}

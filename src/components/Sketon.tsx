import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="grid-container space-y-3">
      <div className="space-y-2">
        <Skeleton className="relative w-full flex justify-center  md:h-[500px] lg:h-[550px] sm:h-[500px] h-[400px] aspect-video" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

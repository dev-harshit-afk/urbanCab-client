import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex h-[80vh] w-screen p-5 flex-col items-center justify-center space-y-3">
      <Skeleton className=" h-[50vh] w-[300px] sm:w-2xl rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[300px]sm:w-2xl" />
        <Skeleton className="h-4 w-[300px] sm:w-2xl" />
      </div>
    </div>
  );
}

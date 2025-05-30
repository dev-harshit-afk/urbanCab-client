import { Skeleton } from "@/components/ui/skeleton";
import SingleDetailSkeleton from "./SingleDetailSkeleton";

export function RideDetailsSkeleton() {
  return (
    <div className=" w-86 sm:w-md sm:p-5  h-fit  rounded-lg">
      <div>
        <div className={`p-2 flex gap-2 flex-col  rounded-lg`}>
          <Skeleton className="h-12 w-[250px]" />
          <SingleDetailSkeleton />
          <SingleDetailSkeleton />
          <SingleDetailSkeleton />
        </div>
      </div>
    </div>
  );
}

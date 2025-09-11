"use client";
import useSubjects from "../_hooks/use-subjects";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChevronDown } from "lucide-react";
import SubjectsCard from "./subjects-card";
import EmptyState from "./empty-state";
import SubjectCardSkeleton from "./subject-card.skeleton";

type Props = {
  initialData: ApiResponse<SubjectsResponse>;
};

export default function SubjectsList({ initialData }: Props) {
  // query
  const { data, fetchNextPage, hasNextPage, isLoading, error, isError } =
    useSubjects({ initialData });

  // Variables
  const allSubjects =
    data?.pages.flatMap((page) => ("subjects" in page ? page.subjects : [])) ||
    [];

  // Empty state
  if (allSubjects.length === 0) {
    return (
      <EmptyState
        title="No Exams Found"
        description="There are no exams available for this subject right now."
        link={{ href: "/", label: "Back to Home" }}
      />
    );
  }

  // Loading state
  if (isLoading && !initialData) {
    return (
      <div className="p-6 space-y-4 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <SubjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) return <h3>{(error as Error)?.message}</h3>;

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={allSubjects.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={
          <div className="flex items-center flex-col justify-center text-gray-600 p-2.5 gap-1 mt-6 text-base">
            <p>Scroll to view more</p>
            <ChevronDown />
          </div>
        }
        endMessage={
          <div className="flex items-center flex-col justify-center text-gray-600 p-2.5 gap-1 mt-6 text-base">
            <p>End of list</p>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allSubjects.map((subject: Subject, index: number) => (
            <SubjectsCard
              key={subject._id || index.toString()}
              subject={subject}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

"use client";
import { ContentFallback, ErrorFallback } from "@/components/shared/";
import SubjectCardSkeleton from "@/components/skeleton/subject-card.skeleton";
import useMediaquery from "@/hooks/use-media-query";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSubjects from "../_hooks/use-subjects";
import SubjectsCard from "./subjects-card";

export default function SubjectsList() {
  // query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    isError,
  } = useSubjects();

  // Hooks
  const { isDesktop } = useMediaquery();

  // Variables
  const allSubjects = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        "subjects" in page ? page.subjects : [],
      ) || []
    );
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <div className="p-3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SubjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (allSubjects.length === 0) {
    return (
      <ContentFallback
        title="No Diplomas Found"
        description="There are no Diplomas available for  right now."
      />
    );
  }

  // Error state
  if (isError) {
    return (
      <ErrorFallback
        description={
          (error?.message as string) ||
          "An error occurred while fetching subjects"
        }
      />
    );
  }

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={allSubjects.length}
        next={fetchNextPage}
        hasMore={Boolean(hasNextPage)}
        scrollableTarget={isDesktop ? "dashboard-scroll" : undefined}
        loader={
          <div className="flex items-center flex-col justify-center text-gray-600 p-2.5 gap-1 mt-6 text-base">
            {isFetchingNextPage ? (
              <p>Loading more...</p>
            ) : (
              <p>Scroll to view more</p>
            )}
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

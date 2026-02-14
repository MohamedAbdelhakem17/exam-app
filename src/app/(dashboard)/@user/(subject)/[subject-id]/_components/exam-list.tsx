"use client";

import { ContentFallback, ErrorFallback } from "@/components/shared/";
import ExamCardSkeleton from "@/components/skeleton/exam-card.skeleton";
import useMediaquery from "@/hooks/use-media-query";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useExams from "../../_hooks/use-exams";
import ExamCard from "./exam-card";

type Props = {
  subject: string;
};

export default function ExamList({ subject }: Props) {
  // query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
  } = useExams({ subject });

  // Hooks
  const { isDesktop } = useMediaquery();

  const allExams = useMemo(() => {
    return (
      data?.pages.flatMap((page) => ("exams" in page ? page.exams : [])) || []
    );
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 space-y-4 flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <ExamCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <ErrorFallback
        description={
          (error?.message as string) || "An error occurred while fetching Exam"
        }
      />
    );
  }

  // Empty state
  if (allExams.length === 0) {
    return (
      <ContentFallback
        title="No Exams Found"
        description="There are no exams available for this subject right now."
        link={{ href: "/", label: "Back to Home" }}
      />
    );
  }

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={allExams.length}
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
        <ul className="p-2 space-y-4 w-full">
          {allExams.map((exam: Exam) => (
            <ExamCard
              link={`/${subject}/${exam._id}`}
              exam={exam}
              key={exam?._id}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

"use client";

import useExams from "../../_hooks/use-exams";
import ExamCard from "./exam-card";
import ExamCardSkeleton from "./exam-card.skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChevronDown } from "lucide-react";
import EmptyState from "../../../_components/empty-state";

type Props = {
  subject: string;
  initialData?: ApiResponse<ExamResponse>;
};

export default function ExamList({ subject, initialData }: Props) {
  // query
  const { data, fetchNextPage, hasNextPage, isError, error, isLoading } =
    useExams({ subject, initialData });

  const allExams =
    data?.pages.flatMap((page) => ("exams" in page ? page.exams : [])) || [];

  // Loading state
  if (isLoading && !initialData) {
    return (
      <div className="p-6 space-y-4 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <ExamCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) return <h3>{(error as Error)?.message}</h3>;

  // Empty state
  if (allExams.length === 0) {
    return (
      <EmptyState
        title="No Exams Found"
        description="There are no exams available for this subject right now."
        link={{ href: "/", label: "Back to Home" }}
      />
    );
  }

  return (
    <InfiniteScroll
      dataLength={allExams.length}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={
        <div className="flex items-center flex-col justify-center text-gray-600 p-2.5 gap-1 mt-6 text-base">
          <p>Loading more...</p>
          <ChevronDown />
        </div>
      }
      endMessage={
        <div className="flex items-center flex-col justify-center text-gray-600 p-2.5 gap-1 mt-6 text-base">
          <p>End of list</p>
        </div>
      }
    >
      <ul className="p-6 space-y-4">
        {allExams.map((exam: Exam) => (
          <ExamCard
            link={`/${subject}/${exam._id}`}
            exam={exam}
            key={exam?._id}
          />
        ))}
      </ul>
    </InfiniteScroll>
  );
}

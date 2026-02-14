import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseExamsProps = {
  subject: string;
  initialData?: ApiResponse<ExamResponse>;
};

export default function useExams({ subject, initialData }: UseExamsProps) {
  const getExams = async (page: number = 1) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/exams?subject=${subject}&page=${page}&limit=40`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...REQUEST_HEADERS,
      },
      cache: "no-store",
    });

    const payload: ApiResponse<ExamResponse> = await response.json();
    return payload;
  };

  const query = useInfiniteQuery({
    queryKey: ["exams", subject],
    queryFn: ({ pageParam = 1 }) => getExams(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if ("code" in lastPage) return undefined;
      return lastPage.metadata?.nextPage ?? undefined;
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
  });

  return {
    ...query,
  };
}

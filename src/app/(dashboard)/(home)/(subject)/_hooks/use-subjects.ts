import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useSubjects({
  initialData,
}: {
  initialData: ApiResponse<SubjectsResponse>;
}) {
  // get subjects function
  const getSubjects = async (page: number = 1) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/subjects?limit=6&page=${page}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...REQUEST_HEADERS,
      },
    });

    const payload: ApiResponse<SubjectsResponse> = await response.json();
    return payload;
  };

  // Use Infinite Query Setup
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["subjects"],

    queryFn: ({ pageParam = 1 }) => getSubjects(pageParam),

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
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  };
}

import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useSubjects() {
  const getSubjects = async (page: number = 1, limit: number = 6) => {
    // Create URL with query parameters
    const encodedParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    }).toString();

    const response = await fetch(`/api/subjects?${encodedParams}`, {
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

      const metadata = lastPage.metadata;

      if (!metadata) return undefined;

      if (metadata.currentPage >= metadata.numberOfPages) return undefined;

      const nextPage = metadata.nextPage ?? metadata.currentPage + 1;

      if (nextPage <= metadata.currentPage) return undefined;

      return nextPage;
    },
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

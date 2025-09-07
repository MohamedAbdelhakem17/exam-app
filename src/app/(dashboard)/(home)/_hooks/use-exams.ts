import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function useExams({ subject }: { subject: string }) {
    const getExams = async (page: number = 1) => {
        const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/exams?subject=${subject}&page=${page}&limit=40`;

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                ...REQUEST_HEADERS,
            },
        });

        const payload: ApiResponse<ExamResponse> = await response.json();
        return payload;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["exams", subject],
        queryFn: ({ pageParam = 1 }) => getExams(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if ("code" in lastPage) return undefined;
            const hasNextPage = Boolean(lastPage.metadata.nextPage);
            if (hasNextPage) return lastPage.metadata.nextPage;
            return undefined;
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

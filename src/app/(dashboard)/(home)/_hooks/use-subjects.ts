import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function useSubjects() {

    // get subjects function 
    const getSubjects = async (page: number = 1) => {
        // console.log("page Number ", page)
        const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/subjects?limit=6&page=${page}`
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                ...REQUEST_HEADERS
            }
        })

        const payload = await response.json()
        return payload
    }

    // Use Infinite Query Setup
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error ,  isLoading } = useInfiniteQuery({
        queryKey: ["subjects"],
        queryFn: ({ pageParam = 1 }) => getSubjects(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const hasNextPage = Boolean(lastPage.metadata.nextPage)
            if (hasNextPage)
                return lastPage.metadata.nextPage
            return undefined
        },
    });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error , isLoading};
}

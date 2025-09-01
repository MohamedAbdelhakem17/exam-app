'use client'

import useSubjects from "../_hooks/use-subjects"
import InfiniteScroll from 'react-infinite-scroll-component'

export default function SubjectsCard() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error,
        isLoading
    } = useSubjects()

    if (isError) return <div>حدث خطأ: {error?.message}</div>
    if (isLoading) return <h2>جاري التحميل...</h2>

    const allSubjects = data?.pages.flatMap(page => page.subjects) || []

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">المواد الدراسية</h2>

            {/* Container with fixed height and scrollable area */}
            <div
                id="scrollableDiv"
                className=" overflow-auto flex flex-col border rounded p-4"
            >
                <InfiniteScroll
                    dataLength={allSubjects.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage || false}
                    loader={<h4 className="text-center">جاري التحميل...</h4>}
                    endMessage={
                        <p className="text-center mt-4">
                            <b>لقد وصلت للنهاية</b>
                        </p>
                    }
                    style={{ display: 'flex', flexDirection: 'column' }}
                    inverse={true}
                    scrollableTarget="scrollableDiv"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {allSubjects.map(subject => (
                            <div
                                key={subject._id}
                                className="h-[220px] py-2 rounded-md border border-sky-300 w-full text-center flex items-center justify-center"
                            >
                                <h2>{subject.name}</h2>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}

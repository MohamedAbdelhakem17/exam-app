'use client'

import Image from "next/image"
import useSubjects from "../_hooks/use-subjects"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

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

    const allSubjects = data?.pages.flatMap(page => page.subjects) || []

    return (
        <div className="w-full">

            {/* Container with fixed height and scrollable area */}


            <InfiniteScroll
                dataLength={allSubjects.length} //This is important field to render the next data
                next={fetchNextPage}
                hasMore={hasNextPage || false}
                loader={
                    <div className="flex items-center flex-col justify-center text-gray-600 p-2.5 gap-1 mt-6 text-base">
                        <p>Scroll to view more</p>
                        <ChevronDown />
                    </div>}
                endMessage={
                    <div className="flex items-center flex-col justify-center text-gray-600 p-2.5 gap-1 mt-6 text-base">
                        <p>End of list</p>
                    </div>
                }
                pullDownToRefreshThreshold={10}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Scroll to view more</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {allSubjects.map(subject => (
                        <Link href={`/${subject._id}`} key={subject._id}>
                            <Card className="col-span-1 relative overflow-hidden" >
                                <CardContent className="p-0">
                                    <Image
                                        src={subject.icon}
                                        alt={subject.name}
                                        width={336}
                                        height={448}
                                        className="h-96  w-full"
                                    />

                                </CardContent>
                                <CardFooter className="absolute bg-blue-500/50 backdrop-blur-md bottom-3 start-3 end-3 py-5 px-4">
                                    <CardTitle className="text-xl text-white">
                                        {subject.name}
                                    </CardTitle>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>
        </div >
    )
}

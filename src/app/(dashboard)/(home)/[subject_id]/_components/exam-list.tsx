"use client"

import React from 'react'
import useExams from '../../_hooks/use-exams'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ChevronDown, Timer } from 'lucide-react';

export default function ExamList({ subject }: { subject: string }) {
    const { data, fetchNextPage, hasNextPage, isError, error, isLoading } = useExams({ subject })
    const allSubjects = data?.pages.flatMap(page => page.exams) || []
    console.log(data)

    const subjectID = subject

    if (isLoading) return <h2>Loading ...</h2>
    if (isError) return <h3>{error?.message}</h3>
    return (
        <div>
            <InfiniteScroll
                dataLength={allSubjects.length}
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
                <ul className="p-6 space-y-4">
                    {allSubjects.map(subject => (
                        <li key={subject?._id}>
                            <Link href={`/${subjectID}/${subject._id}`} className='flex items-center justify-between p-4 bg-blue-50'>
                                <h3>
                                    <span className='text-xl font-semibold text-blue-60 block mb-1'>{subject?.title}</span>
                                    <span className='text-sm text-gray-500 block'>{subject?.numberOfQuestions} Questions</span>
                                </h3>

                                <p className='flex  items-center gap-x-2'>
                                    <Timer className='w-6 h-6 text-gray-400' />
                                    <span className='text-sm font-medium m-0 p-0'>
                                        Duration : {subject?.duration} minutes
                                    </span>
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>

        </div>

    )
}

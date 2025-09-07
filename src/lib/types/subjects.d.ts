declare type Subject = {
    _id: string,
    name: string,
    icon: string,
    createdAt: string
}


declare type SubjectsResponse = {
    metadata: {
        currentPage: number,
        numberOfPages: number,
        limit: number,
        nextPage: number
    },
    subjects: Subject[]
}
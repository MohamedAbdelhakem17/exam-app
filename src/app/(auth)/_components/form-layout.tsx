import React from 'react'

type FormLayout = {
    label: string,
    children: React.ReactNode
}
export default function FormLayout({ label, children }: FormLayout) {
    return (
        <div className='w-[28.625rem]'>
            <h1 className='pb-6 text-3xl font-bold text-gray-800 font-inter'>{label}</h1>
            {children}
        </div>
    )
}

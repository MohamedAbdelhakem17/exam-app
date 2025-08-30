import React from 'react'

type FormLayout = {
    label: string,
    resetPassword?: boolean
    children: React.ReactNode
}
export default function FormLayout({ label, resetPassword, children }: FormLayout) {
    return (
        <div className='w-lg'>
            <h1 className={`${resetPassword && "mb-10"}pb-6 text-3xl font-bold text-gray-800 font-inter`}>{label}</h1>
            {children}
        </div>
    )
}

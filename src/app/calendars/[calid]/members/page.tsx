'use server'

import React from "react";

import { fetchMembers } from "@/api/members"

import { cookies } from "next/headers";

import MembersTable from "@/app/components/membersTable";

import Link from 'next/link';


export default async function MembersManagement({ params, searchParams }: { params: Promise<{ calid: string }>, searchParams: Promise<{ page?: string, limit?: string }> }) {

    const query = new URLSearchParams(await searchParams)
    if (!query.has('page')) {
        query.set('page', '1')
    }
    if (!query.has('limit')) {
        query.set('limit', '15')
    }

    const calendarId = (await params).calid
    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const { data: { data: data } } = await fetchMembers(calendarId, query.toString(), token) // ha ha ha

    return (
        <main>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>สมาชิกทั้งหมด</h1>
                <div className='flex justify-end my-2'>
                    <Link href={`/calendars/${calendarId}/members/create`}>
                        <div className='px-5 py-4 bg-gray-200 rounded-sm'>
                            เพื่มสมาชิกใหม่
                        </div>
                    </Link>
                </div>
            </div>
            <MembersTable dataSource={data.data} page={data.pagination.current_page} limit={data.pagination.limit} total={data.pagination.total_records} />
        </main>
    )

}
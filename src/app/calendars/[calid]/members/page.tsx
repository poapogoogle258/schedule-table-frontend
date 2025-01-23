'use server'

import React from "react";

import { fetchMembers } from "@/api/members"

import { cookies } from "next/headers";

import MembersTable from "@/app/components/membersTable";

import Link from 'next/link';

export default async function MembersManagement({ params }: { params: Promise<{ calid: string }> }) {

    const calendarId = (await params).calid
    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const res = await fetchMembers(calendarId, token)

    return <>
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
        <MembersTable dataSource={res.data.data} />
    </>
}
'use server'

import React from 'react';

import {fetchSchedules} from "@/api/schedules"
import { cookies } from 'next/headers';

import CardSchedule from "@/app/components/cardSchedule"
import Link from 'next/link';

export default async function SchedulePage({ params }: { params: Promise<{ calid: string }> }) {

    const calendarId = (await params).calid

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const resp = await fetchSchedules(calendarId, token)
    console.log(resp.status)

    return <>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold'>หน้าที่เวรทั้งหมด</h1>
            <div className='flex justify-end my-2'>
                <Link href={`/calendars/${calendarId}/schedules/create`}>
                    <div className='px-5 py-4 bg-gray-200 rounded-sm'>
                        เพิ่มเวร
                    </div>
                </Link>
            </div>
        </div>
        <div className='container my-5 grid auto-cols-max grid-flow-col gap-4'>
            {resp.data.data.map((schedule) => {
                return <CardSchedule key={schedule.id} schedule={schedule} />
            })}
        </div>
  
    </>
}


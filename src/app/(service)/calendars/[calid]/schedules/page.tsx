'use server'

import React from 'react';

import { fetchSchedules } from "@/api/schedules"

import CardSchedule from "@/app/components/cardSchedule"
import Link from 'next/link';
import { Row, Col, Grid } from "antd"
import { auth } from '@/auth';

export default async function SchedulePage({ params }: { params: Promise<{ calid: string }> }) {

    const calendarId = (await params).calid

    const session = await auth()
    const token = session!.access_token!

    const resp = await fetchSchedules(calendarId, token)

    return (
        <main>
            <div className='w-full px-4 py-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>หน้าที่เวรทั้งหมด</h1>
                    <div className='flex justify-end my-2'>
                        <Link href={`/calendars/${calendarId}/schedules/create`}>
                            <div className='px-5 py-4 bg-gray-200 rounded-sm'>
                                เพิ่มเวร
                            </div>
                        </Link>
                    </div>
                </div>
                {/* <div className='mx-8 my-5 flex flex-wrap gap-10'> */}
                <div className='pt-10'>
                    <Row gutter={[24, 24]}>
                        {resp.data.data.map((schedule) => {
                            return <Col key={schedule.id}>
                                <CardSchedule key={schedule.id} schedule={schedule} />
                            </Col>
                        })}
                    </Row>
                </div>
            </div>

        </main>
    )
}


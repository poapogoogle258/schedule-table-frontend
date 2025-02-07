'use server'

import React, { Suspense } from "react"

import { Row, Col } from "antd"
import TaskCalendar from "@/app/components/calendar"
import ScheduleDescriptionTable from "@/app/components/scheduleDescriptionTable"
import InputSearchNameMember from "@/app/components/inputSearchName"
import dayjs from "dayjs"

import { fetchTasks } from "@/api/tasks"
import { fetchMembers } from "@/api/members"

import { auth } from '@/auth'
import { notFound } from "next/navigation"


export default async function CalendarPage({ searchParams, params }: { searchParams : Promise<{ [key: string]: string | string[] | undefined }> ,params: Promise<{ calid: string }> }) {

  const calendarId = (await params).calid

  const session = await auth()

  const now = dayjs()
  const defaultStart = now.startOf('month').toDate()
  const defaultEnd = now.endOf('month').toDate()

  const queryStart = (await searchParams).start as string
  const queryEnd = (await searchParams).end as string

  const startDate = queryStart ? new Date(queryStart) : defaultStart;
  const endDate = queryEnd ? new Date(queryEnd) : defaultEnd;

  const token = session!.token

  let respTasks;
  try{
    respTasks = await fetchTasks(calendarId, startDate, endDate, token)
  }catch(error){
    notFound()
  }

  return (
    <main>
      <div className="w-full px-4 py-4">
        <Row justify='start' gutter={[24, 24]}>
          <Col xs={24} md={20}>
            <div className="grid grid-flow-row gap-4">
              <div className="max-w-[600px] flex flex-row gap-4">
                <Suspense>
                  <S_InputSearchNameMember calendarId={calendarId} />
                </Suspense>
              </div>
              <TaskCalendar dataSource={respTasks.data.data} />
            </div>
          </Col>
          <Col xs={24} md={4}>
            <ScheduleDescriptionTable tasks={respTasks.data.data} />
          </Col>
        </Row>
      </div>
    </main>
  )
}


async function S_InputSearchNameMember({ calendarId }: { calendarId: string }) {
  const session = await auth()
  const resp_members = await fetchMembers(calendarId, "all=1", session!.token)

  return <InputSearchNameMember members={resp_members.data.data.data} />
}




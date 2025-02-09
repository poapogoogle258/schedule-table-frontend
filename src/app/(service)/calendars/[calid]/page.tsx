'use server'

import React, { Suspense } from "react"

import { Status as TaskStatus } from "@/type/task"

import { Row, Col } from "antd"
import TaskCalendar from "@/app/components/calendar"
import ScheduleDescriptionTable from "@/app/components/scheduleDescriptionTable"
import InputSearchNameMember from "@/app/components/inputSearchName"
import dayjs from "dayjs"

import { fetchTasks } from "@/api/tasks"
import { fetchMembers } from "@/api/members"

import { auth } from '@/auth'
import { notFound } from "next/navigation"



export default async function CalendarPage({ searchParams, params }: { searchParams : Promise<{ start? : string , end? : string }> ,params: Promise<{ calid: string }> }) {

  const calendarId = (await params).calid
  const { start, end } = (await searchParams)

  const session = await auth()
  const token = session!.access_token!


  const defaultStart = dayjs().startOf('month')
  const defaultEnd = dayjs().endOf('month')

  const rangeStart = start ? dayjs(start) : defaultStart;
  const rangeEnd = end ? dayjs(end) : defaultEnd;

  const resp = await fetchTasks(calendarId, rangeStart, rangeEnd, token)
  const tasks = resp.data.data.filter((task) => task.status != TaskStatus.Canceled )

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
              <TaskCalendar dataSource={tasks} />
            </div>
          </Col>
          <Col xs={24} md={4}>
            <ScheduleDescriptionTable tasks={tasks} />
          </Col>
        </Row>
      </div>
    </main>
  )
}


async function S_InputSearchNameMember({ calendarId }: { calendarId: string }) {
  const session = await auth()
  const token = session!.access_token!
  
  const resp_members = await fetchMembers(calendarId, "all=1", token)

  return <InputSearchNameMember members={resp_members.data.data.data} />
}




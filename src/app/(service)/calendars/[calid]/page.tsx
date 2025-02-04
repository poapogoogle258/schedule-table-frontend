'use server'

import React from "react"

import { Row, Col } from "antd"
import TaskCalendar from "@/components/calendar"
import ScheduleDescriptionTable from "@/components/scheduleDescriptionTable"
import InputSearchNameMember from "@/components/inputSearchName"

import { fetchTasks } from "@/api/tasks"
import { fetchMembers } from "@/api/members"

import { cookies } from 'next/headers'

export default async function CalendarPage({ params }: { params: Promise<{ calid: string }> }) {

  const cookiesStone = await cookies()
  const calendarId = (await params).calid

  const start = new Date("2025-01-01 00:00:00")
  const end = new Date("2025-02-28 00:00:00")

  const token = cookiesStone.get("token")!.value

  const [respTasks, respMembers] = await Promise.all([fetchTasks(calendarId, start, end, token), fetchMembers(calendarId, "all=1", token)])

  return (
    <main>
      <div className="w-full px-4 py-4">
        <Row justify='start' gutter={[24, 24]}>
          <Col xs={24} md={20}>
            <div className="grid grid-flow-row gap-4">
              <div className="max-w-[600px] flex flex-row gap-4">
                <InputSearchNameMember members={respMembers.data.data.data} />
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

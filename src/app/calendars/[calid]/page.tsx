'use server'

import React from "react"

import { Row, Col } from "antd"
import TaskCalendar from "@/app/components/calendar"
import ScheduleDescriptionTable from "@/app/components/scheduleDescriptionTable"
import InputSearchNameMember from "@/app/components/inputSearchName"
import { ProfileOutlined } from "@ant-design/icons"

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
      <Row>
        <Col span={20}>
          <div className="mx-2 my-5 flex flex-row gap-5">
            <ProfileOutlined color="blue" />
            <InputSearchNameMember members={respMembers.data.data.data} />
          </div>
          <TaskCalendar dataSource={respTasks.data.data} />
        </Col>
        <Col span={4}>
            <ScheduleDescriptionTable tasks={respTasks.data.data} />
        </Col>
      </Row>
    </main>
  )

}

'use server'

import React from "react"

import { Row , Col } from "antd"
import TaskCalendar from "@/app/components/calendar"
import ScheduleDescriptionTable from "@/app/components/scheduleDescriptionTable"
import { fetchTasks } from "@/api/tasks"

import { cookies } from 'next/headers'

export default async function CalendarPage({ params }: { params: Promise<{ calid: string }> }) {

  const cookiesStone = await cookies()
  const calendarId = (await params).calid

  const start = new Date("2025-01-01 00:00:00")
  const end = new Date("2025-02-28 00:00:00")

  const token = cookiesStone.get("token")!.value

  const res = await fetchTasks(calendarId, start, end, token)

  return <>
    <Row>
      <Col span={20}>
        <TaskCalendar dataSource={res.data.data}/>
      </Col>
      <Col span={1}/>
      <Col span={3}>
        <h1 className="text-xl font-medium text-black">เวรประจำวันนี้</h1>
        <ScheduleDescriptionTable />
      </Col>
    </Row>
  </>
}

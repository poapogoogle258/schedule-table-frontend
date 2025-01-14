'use client'

import React from "react"
import { Calendar, Tag } from "antd"

import type { Task } from "@/api/tasks"

import dayjs from "dayjs"
import type { CellRenderInfo } from 'rc-picker/lib/interface';

export default function TaskCalendar({ dataSource } : { dataSource: Task[] }) {

    const cellRender = (current: dayjs.Dayjs, info: CellRenderInfo<dayjs.Dayjs>) => {
        if (info.type == "date") {
            return dataSource
                .filter((task) => dayjs(task.start).isSame(current, 'date'))
                .map((task) => {
                    return <Tag key={task.id} color={task.person.color}>
                        {`${task.person.name} (${task.person.nickname})`}
                    </Tag>
                })
        }
        return <></>
    }

    return <>
        <Calendar cellRender={cellRender} />
    </>
}
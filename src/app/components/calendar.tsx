'use client'

import React, { useMemo, useContext } from "react"
import { Calendar, Tag } from "antd"
import { CalendarProps } from "antd"

import type { Task } from "@/type/task"

import dayjs from "dayjs"
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import { CalendarSelectContext } from "@/app/calendars/[calid]/select-date-provider"
import { searchContext } from "@/app/calendars/[calid]/search-name-provider"


export default function TaskCalendar({ dataSource }: { dataSource: Task[] }) {

    const { setDateCalendarSelect } = useContext(CalendarSelectContext)
    const { search } = useContext(searchContext)

    const dataGroupByDate = useMemo(() => {
        return Object.groupBy(dataSource, (task) => dayjs(task.start).format("DD/MM/YYYY"))
    }, [])


    const cellRender = (current: dayjs.Dayjs, info: CellRenderInfo<dayjs.Dayjs>) => {
        if (info.type == "date") {
            const key = current.format("DD/MM/YYYY")

            return dataGroupByDate[key]?.filter((task) => search === "" || search === task.person.id) 
            .map((task) => {
                return <Tag key={task.id} color={task.person.color}>
                    {`${task.person.name} (${task.person.nickname})`}
                </Tag>
            }) ?? null
        }
        return <></>

    }

    const onSelect:CalendarProps<dayjs.Dayjs>['onSelect']  = (date) => {
        setDateCalendarSelect(date.format("DD/MM/YYYY"))
    }

    return <>
        <Calendar cellRender={cellRender} onSelect={onSelect}/>
    </>
}
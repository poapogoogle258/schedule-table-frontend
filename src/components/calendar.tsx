'use client'

import React, { useMemo, useContext } from "react"
import { Calendar, Tag } from "antd"
import { CalendarProps } from "antd"

import type { Task } from "@/type/task"

import dayjs from "dayjs"
import type { CellRenderInfo } from 'rc-picker/lib/interface';

import { useCalendarPageStore } from "@/state/provider/calendar-page-provider"


export default function TaskCalendar({ dataSource }: { dataSource: Task[] }) {

    const { textSearched, setDateSelected } = useCalendarPageStore((state) => state)

    const dataGroupByDate = useMemo(() => {
        return Object.groupBy(dataSource, (task) => dayjs(task.start).format("DD/MM/YYYY"))
    }, [])


    const cellRender = (current: dayjs.Dayjs, info: CellRenderInfo<dayjs.Dayjs>) => {
        if (info.type == "date") {
            const key = current.format("DD/MM/YYYY")

            return dataGroupByDate[key]?.filter((task) => textSearched === "" || textSearched === task.person.name) 
            .map((task) => {
                return <Tag key={task.id} color={task.person.color}>
                    {`${task.person.name} (${task.person.nickname})`}
                </Tag>
            }) ?? null
        }
        return <></>

    }

    const onSelect:CalendarProps<dayjs.Dayjs>['onSelect']  = (date) => {
        setDateSelected(date.format("DD/MM/YYYY"))
    }

    return <>
        <Calendar cellRender={cellRender} onSelect={onSelect}/>
    </>
}
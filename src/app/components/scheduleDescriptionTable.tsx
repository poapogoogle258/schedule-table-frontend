'use client'

import React, { useMemo, useContext } from "react";
import { List, Tag, Avatar, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"

import dayjs from "dayjs"
import { CalendarSelectContext } from "@/app/calendars/[calid]/select-date-provider"
import { searchContext } from "../calendars/[calid]/search-name-provider";

import type { Task, Person, Description } from "@/type/task";
import type { Member } from "@/type/member";
import useConfig from "antd/es/config-provider/hooks/useConfig";

interface ScheduleDescriptionTableProps {
    tasks: Task[]
}


interface DescriptionScheduleMemberProps {
    member: Person
}
const DescriptionScheduleMember: React.FC<DescriptionScheduleMemberProps> = ({ member }) => {
    return <div className="grid grid-cols-3">
        <div className="col-span-1">
            <Avatar src={member.imageURL} size='large' shape='circle' />
        </div>
        <div className="col-span-2">
            <h4 className="text-m font-bold">{member.name}</h4>
            <p className="text-xs font-thin text-black/30">({member.position})</p>
        </div>

    </div>
}


interface DescriptionScheduleProps {
    time: string
    info: Description
    members: Person[]
}
const DescriptionSchedule: React.FC<DescriptionScheduleProps> = ({ time, info, members }) => {
    return (
        <div className="container my-4">
            <Tag color="blue">⏱ {time}</Tag>
            <div className="py-2">
                <h2 className="font-bold text-lg">{info.name}</h2>
                <p className="font-light text-black/40 line-clamp-2">{info.description}</p>
            </div>
            <div className="flex flex-col gap-2">
                {members.map((member) => <DescriptionScheduleMember member={member} />)}
            </div>
        </div>
    )
}


const ScheduleDescriptionTable: React.FC<ScheduleDescriptionTableProps> = ({ tasks }) => {

    const { dateCalendarSelect } = useContext(CalendarSelectContext)
    const { search } = useContext(searchContext)

    const tasksDate = useMemo(() => {
        return Object.groupBy(tasks, (task) => dayjs(task.start).format("DD/MM/YYYY"))
    }, [])

    const display = useMemo(() => {
        return Object.entries(Object.groupBy(tasksDate[dateCalendarSelect]?.filter((task) => search === "" || search === task.person.id) ?? [], (t) => t.schedule_id))
    }, [dateCalendarSelect, search])

    return (
        <>
            <h1 className="text-xl font-medium text-black">เวรประจำวัน {dateCalendarSelect}</h1>
            <div className="container max-h-[90vh] overflow-y-auto mx-5 px-5 py-5">
                <div className="flex flex-col ">    
                    {display.map(([id, l_task]) => {
                        if (l_task == undefined || l_task?.length == 0) {
                            return null
                        }

                        const start = dayjs(l_task[0].start).format("HH:mm")
                        const end = dayjs(l_task[0].end).format("HH:mm")
                        const time = `${start} - ${end}`
                        const members = l_task?.map((i) => i.person)

                        return <DescriptionSchedule time={time} info={l_task[0].description} members={members} />
                    })}
                </div>
            </div>
        </>
    )

}

export default ScheduleDescriptionTable;
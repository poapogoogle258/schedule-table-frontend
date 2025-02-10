'use client'

import React, { useMemo } from "react";
import dayjs from "dayjs"
import { Tag, Avatar } from "antd";
import { uploadImageUrl } from "@/api/client"
import { useCalendarPageStore } from "@/app/state/provider/calendar-page-provider";
import type { Task, Person, Description } from "@/type/task";

interface DescriptionScheduleMemberProps {
    member: Person | null
}

const DescriptionScheduleMember: React.FC<DescriptionScheduleMemberProps> = ({ member }) => {

    const defaultAvatarProfile = `${uploadImageUrl}/default-profile.jpg`
    const defaultName = "ว่าง"
    const defaultPosition = ".."

    return <div className="grid grid-cols-3">
        <div className="col-span-1">
            <Avatar src={member?.imageURL || defaultAvatarProfile} size='large' shape='circle' />
        </div>
        <div className="col-span-2">
            <h4 className="text-m font-bold">{member?.name || defaultName}</h4>
            <p className="text-xs font-thin text-black/30">({member?.position || defaultPosition})</p>
        </div>
    </div>
}

interface DescriptionScheduleProps {
    time: string
    info: Description
    members: (Person | null)[]
}

const DescriptionSchedule: React.FC<DescriptionScheduleProps> = ({ time, info, members }) => {
    return (
        <div className="container">
            <Tag color="blue">⏱ {time}</Tag>
            <div className="py-2">
                <h2 className="font-bold text-lg">{info.name}</h2>
                <p className="font-light text-black/40 line-clamp-1">{info.description}</p>
            </div>
            <div className="flex flex-col gap-2">
                {members?.map((member) => <DescriptionScheduleMember key={member?.id || new Date().valueOf()} member={member} />)}
            </div>
        </div>
    )
}

interface ScheduleDescriptionTableProps {
    tasks: Task[]
}

const ScheduleDescriptionTable: React.FC<ScheduleDescriptionTableProps> = ({ tasks }) => {

    const { dateSelected, textSearched } = useCalendarPageStore((state) => state)

    const tasksDate = useMemo(() => {
        return Object.groupBy(tasks, (task) => dayjs(task.start).format("DD/MM/YYYY"))
    }, [tasks])

    const display = useMemo(() => {
        return Object.entries(Object.groupBy(tasksDate[dateSelected]?.filter((task) => textSearched === "" || textSearched === task.person!.name) ?? [], (t) => t.schedule_id))
    }, [dateSelected, textSearched, tasksDate])

    return (
        <div className="grid grid-row gap-6">
            <h1 className="text-lg font-medium text-black">
                เวรประจำวัน {dateSelected}
            </h1>
            <div className="w-full xs:h-full md:max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col gap-7">
                    {display.map(([id, l_task]) => {
                        if (l_task == undefined || l_task?.length == 0) {
                            return null
                        }
                        const start = dayjs(l_task[0].start).format("HH:mm")
                        const end = dayjs(l_task[0].end).format("HH:mm")
                        const time = `${start} - ${end}`
                        const members = l_task?.map((i) => i!.person)

                        return <DescriptionSchedule key={id} time={time} info={l_task[0].description} members={members} />
                    })}
                </div>
            </div>
        </div>
    )

}

export default ScheduleDescriptionTable;